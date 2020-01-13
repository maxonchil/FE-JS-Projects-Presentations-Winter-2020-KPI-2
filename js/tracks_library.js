/*Use AJAX require to write data to localeStorage from JSON file and on readyState = 
4 activate a function for using this soundtracks on website*/
let xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
        try {
            localStorage.setItem("soundtracks_base", xhr2.responseText);
            useSoundTracks();
        } catch (error) {
            if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                localStorage.clear();
                localStorage.setItem("soundtracks_base", xhr2.responseText);
            }
        }

    }
}

xhr2.open('GET', '../soundtracks_base.json');
xhr2.send();

function useSoundTracks() {
    //Create an array with all soundtracks(take it from localeStorage)
    let soundtracks_base = JSON.parse(localStorage.getItem("soundtracks_base")),
        soundtracks_array = [];
    //Selected controls, audio elements and their 'p' tag for show a soundtrack name
    let library_titles = document.querySelectorAll(".library__main-title"),
        library_audio = document.querySelectorAll(".library__main-audio"),
        library_controls = document.querySelectorAll(".library__bottom-controlsItem");

    // Bring songs and their names to the page
    for (let i = 0; i < 10; i++) {
        library_titles[i].innerHTML = soundtracks_base[i].trackName;
        library_audio[i].setAttribute("src", soundtracks_base[i].src);
    }
    //Added -active class to set up defoult chosed controler
    library_controls[0].className += "-active";

    //Added event on all library controls (pagination functionality)
    for (let i = 0; i < library_controls.length; i++) {

        library_controls[i].onclick = (e) => {

            let curent_page = +e.target.innerText,
                soundtracks_count = library_controls[i].innerText + 0,


                for (let i = +soundtracks_count - 10; i < +soundtracks_count; i++) {
                    soundtracks_array.push(soundtracks_base[i]);
                }

            for (let i = 0; i < soundtracks_array.length; i++) {
                soundtracks_array[i] === undefined ? library_titles[i].innerHTML = "" : library_titles[i].innerHTML = soundtracks_array[i].trackName;
                if (soundtracks_array[i] === undefined) {
                    library_audio[i].removeAttribute("controls");
                } else {
                    if (library_audio[i].hasAttribute("controls")) {
                        library_audio[i].setAttribute("src", soundtracks_array[i].src);
                    } else {
                        library_audio[i].setAttribute("controls", "controls");
                        library_audio[i].setAttribute("src", soundtracks_array[i].src);
                    }


                }
            }

            if (Math.ceil(soundtracks_base.length / 10) - curent_page === 1 || curent_page === Math.ceil(soundtracks_base.length / 10)) {

                for (let i = 0; i < library_controls.length; i++) {
                    library_controls[i].className = "library__bottom-controlsItem";
                }
                library_controls[i].className += "-active";
            } else {
                if (curent_page >= 3) {
                    for (let i = 0; i < library_controls.length; i++) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                    library_controls[0].innerText = curent_page - 2;
                    library_controls[1].innerText = curent_page - 1;
                    library_controls[2].className += "-active";
                    library_controls[2].innerText = curent_page;
                    library_controls[3].innerText = curent_page + 1;
                    library_controls[4].innerText = curent_page + 2;
                } else {
                    for (let i = 0; i < library_controls.length; i++) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                    e.target.className += "-active"

                }
            }

        }
    }


}