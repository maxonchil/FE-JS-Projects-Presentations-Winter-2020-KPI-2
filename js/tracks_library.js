let xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
        try {
            localStorage.setItem("tracks_base", xhr2.responseText);
            useTracks();
        } catch (error) {
            if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                localStorage.clear();
                localStorage.setItem("tracks_base", xhr2.responseText);
            }
        }

    }
}

xhr2.open('GET', '../tracks_base.json');
xhr2.send();

function useTracks() {

    let tracks_base = JSON.parse(localStorage.getItem("tracks_base"));

    let library_titles = document.querySelectorAll(".library__main-title"),
        library_audio = document.querySelectorAll(".library__main-audio"),
        library_controls = document.querySelectorAll(".library__bottom-controlsItem");

    for (let i = 0; i < 10; i++) {
        library_titles[i].innerHTML = tracks_base[i].trackName;
        library_audio[i].setAttribute("src", tracks_base[i].src);
    }

        for (let i = 0; i < library_controls.length; i++) {

            library_controls[i].onclick = (e) => {

                let curent_page = +e.target.innerText,
                    tracks_count = library_controls[i].innerText + 0,
                    tracks_array = [];

                          //here is need to collapse 2 loop's in one
                for (let i = +tracks_count - 10; i < +tracks_count; i++) {
                    tracks_array.push(tracks_base[i]);
                }

                for (let i = 0; i < tracks_array.length; i++) {
                    tracks_array[i] === undefined ? library_titles[i].innerHTML = "" : library_titles[i].innerHTML = tracks_array[i].trackName;
                    if (tracks_array[i] === undefined) {
                        library_audio[i].removeAttribute("controls");
                    } else {
                        if (library_audio[i].hasAttribute("controls")) {
                            library_audio[i].setAttribute("src", tracks_array[i].src);
                        } else {
                            library_audio[i].setAttribute("controls", "controls");
                            library_audio[i].setAttribute("src", tracks_array[i].src);
                        }


                    }
                }

                //it over here
                if(Math.ceil(tracks_base.length / 10) - curent_page === 2 || curent_page === Math.ceil(tracks_base.length / 10)) {
                    library_controls[3].innerHTML = Math.ceil(tracks_base.length / 10) - 1;
                    for (let i = 0; i < library_controls.length; i++) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                    library_controls[i].className += "-active";
                } else {
                    if (curent_page >= 2) {
                        for (let i = 0; i < library_controls.length; i++) {
                            library_controls[i].className = "library__bottom-controlsItem";
                        }
                        library_controls[0].innerText = curent_page - 1;
                        library_controls[1].innerText = curent_page;
                        library_controls[1].className += "-active";
                        library_controls[2].innerText = curent_page + 1;
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