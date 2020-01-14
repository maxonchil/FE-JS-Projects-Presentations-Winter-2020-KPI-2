//Create a promise of AJAX request to set up a item on localeStorage first and then use it

async function ajax_soundtracks() {
    return new Promise(function (resolve, reject) {
        let xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                resolve(xhr2.responseText);
            }
        }
        xhr2.open('GET', 'soundtracks_base.json');
        xhr2.send();
    })

}

//Check by async function is in localeStorage exist soundracks base or not. 

(async () => {
    let data;
    if (!localStorage.getItem("soundtracks_base")) {
        data = await ajax_soundtracks();
        localStorage.setItem("soundtracks_base", data);
    } else {
        data = localStorage.getItem("soundtracks_base");
    }
    useSoundTracks(JSON.parse(data));
})();


//Main function to work with data
function useSoundTracks(data) {
    //Create an array with all soundtracks, array for вata output for different sortings and max page

    let soundtracks_base = data,
        soundtracks_array = [],
        max_page = Math.ceil(soundtracks_base.length / 10);

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

    //Function for rewriting innerText of controls when user click on it
    function controlsInner(left_shift, basic_page, active_e) {
        let counter = left_shift;
        library_controls.forEach(function (e) {
            if (e.classList.contains("library__bottom-controlsItem-active")) {
                e.className = "library__bottom-controlsItem";
            }
            e.innerText = basic_page + counter;
            counter++;
        })
        library_controls[active_e].className += "-active";
    }

    //Added event on all library controls (pagination functionality)
    for (let i = 0; i < library_controls.length; i++) {

        library_controls[i].onclick = (e) => {

            let curent_page = +e.target.innerText,
                soundtracks_count = library_controls[i].innerText + 0;
            soundtracks_array = [];


            for (let i = +soundtracks_count - 10; i < +soundtracks_count; i++) {
                soundtracks_array.push(soundtracks_base[i]);
            }

            // If on a last page is less that 10 elements, then hide other 'audio' tag by delete controls tag

            for (let i = 0; i < soundtracks_array.length; i++) {
                if (soundtracks_array[i] === undefined) {
                    library_audio[i].removeAttribute("controls");
                    library_titles[i].innerHTML = "";
                } else {
                    library_titles[i].innerHTML = soundtracks_array[i].trackName;
                    if (library_audio[i].hasAttribute("controls")) {
                        library_audio[i].setAttribute("src", soundtracks_array[i].src);
                    } else {
                        library_audio[i].setAttribute("controls", "controls");
                        library_audio[i].setAttribute("src", soundtracks_array[i].src);
                    }
                }
            }

            //Redrawing Controls when user click on it

            if (curent_page === max_page) {
                for (let i = 0; i < library_controls.length; i++) {
                    if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                }
                e.target.className += "-active"

            } else if (max_page - curent_page === 1) {

                controlsInner(-4, max_page, 3);

            } else if (curent_page >= 3) {
                controlsInner(-2, curent_page, 2);


            } else if (curent_page === 2) {

                controlsInner(1, 0, 1);

            } else {
                for (let i = 0; i < library_controls.length; i++) {
                    if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                }
                e.target.className += "-active"
            }


        }
    }
    document.querySelector(".library_bottom-beginning-btn").onclick = () => {
        for(i = 0; i < 10; i++) {
            if(library_audio[i].hasAttribute("controls")) {
                library_audio[i].setAttribute("src", soundtracks_base[i].src)
                library_titles[i].innerHTML = soundtracks_base[i].trackName;
            }else {
                library_audio[i].setAttribute("controls", "controls");
                library_audio[i].setAttribute("src", soundtracks_base[i].src)
                library_titles[i].innerHTML = soundtracks_base[i].trackName;
            }
        }
        controlsInner(1, 0, 0);
    }
    document.querySelector(".library_bottom-end-btn").onclick = () => {
        let tracks_count = soundtracks_base.length % 10 === 0 ? 10 : soundtracks_base.length % 10;
        let soundtracks_array = [];
        for (let i = soundtracks_base.length - tracks_count; i < soundtracks_base.length; i++) {
            soundtracks_array.push(soundtracks_base[i]);
        }
        for (let i = 0; i <  10; i++) {
            if (soundtracks_array[i] === undefined) {
                library_audio[i].removeAttribute("controls");
                library_titles[i].innerHTML = "";
            } else {
                library_titles[i].innerHTML = soundtracks_array[i].trackName;
                if (library_audio[i].hasAttribute("controls")) {
                    library_audio[i].setAttribute("src", soundtracks_array[i].src);
                } else {
                    library_audio[i].setAttribute("controls", "controls");
                    library_audio[i].setAttribute("src", soundtracks_array[i].src);
                }
            }
        }
        controlsInner(-4, max_page, 4);
    }
}