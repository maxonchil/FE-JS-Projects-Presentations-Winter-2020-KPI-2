document.querySelector(".header__upload").onclick = (event) => {
    if (/^logIn/.test(document.cookie)) {
        let input_upload = document.getElementById("upload");
        input_upload.onchange = () => {

            for (i = 0; i < input_upload.files.length; i++) {

                let upload_song = {
                    src: "music/" + input_upload.files[i].name,
                    trackName: input_upload.files[i].name.split(".mp3")[0],
                    genre: "Rock",
                    album: "Hyperspace",
                    rating: []
                }
                // soundtracks_base.push(upload_song);
                console.log(upload_song );
            }
        }

    } else {
        alert("Please login first or create acount!")
        event.preventDefault();
        return;
    }
}