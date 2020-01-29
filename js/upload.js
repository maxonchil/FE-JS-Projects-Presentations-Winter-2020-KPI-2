document.getElementsByClassName("header__upload-button")[0].onclick = (event) => {
    let upload_form = document.getElementsByClassName("header__upload-form")[0],
        upload_btn = document.getElementsByClassName("header__upload-button")[0],
        upload_input = document.getElementById("upload"),
        upload_genre;

    if (/^logIn/.test(document.cookie)) {
        upload_form.classList.toggle("active", true);

        //Close upload form if click somewhere else
        document.onclick = (e) => {
            if (
                e.target !== upload_btn &&
                e.target !== upload_form &&
                !upload_form.contains(e.target)
            ) {
                upload_form.classList.remove("active");
            }
        }

        //Get genre of song (value of option)
        Array.from(document.getElementsByClassName("header__upload-option"),
            (e) => {
                e.onclick = () => {
                    upload_genre = e.value;
                }
            })

        //When file uploaded, add it to global variable and LS
        upload_input.onchange = () => {

            for (i = 0; i < upload_input.files.length; i++) {

                let upload_song = {
                    src: "music/" + upload_input.files[i].name,
                    trackName: upload_input.files[i].name.split(".mp3")[0],
                    genre: upload_genre,
                    album: "",
                    rating: []
                }

                soundtracks_base.push(upload_song);

                try {
                    localStorage.setItem("soundtracks_base", JSON.stringify(soundtracks_base));
                } catch (e) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem("soundtracks_base", JSON.stringify(soundtracks_base));
                    }
                }
            }
            upload_form.classList.toggle("active", false);
        }

    } else {
        alert("Please login first or create acount!")
    }
}