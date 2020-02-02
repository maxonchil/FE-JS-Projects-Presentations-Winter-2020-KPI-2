const SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", () => {

    //Enable albums cover art
    document.getElementById("albums__item-checked").checked = true;

    let albums = document.getElementsByClassName("albums__cover"),
        inner = document.getElementsByClassName("albums__tracks-inner")[0],
        top_inner = document.getElementsByClassName("albums__track-top")[0];

    //Clear the contents of the container before displaying the following items
    for (let i = 0; i < albums.length; i++) {
        albums[i].onchange = () => {

            if (inner.children.length > 0) {
                while (inner.firstChild) {
                    inner.removeChild(inner.firstChild);
                }
            }

            //Get the song corresponding to the album, create this element and add it to the page
            SOUNDTRACKS_DATA.soundtracks_base.filter(e => e.album === albums[i].dataset.album).forEach(element => {

                let div = document.createElement("div"),
                    p_title = document.createElement("p"),
                    p = document.createElement("p"),
                    audio = document.createElement("audio");

                if (document.getElementsByClassName("albums__tracks-title").length === 0) {
                    p_title.className = "albums__tracks-title";
                    p_title.innerText = element.album;
                    top_inner.appendChild(p_title);
                } else {
                    document.getElementsByClassName("albums__tracks-title")[0].innerText = element.album;
                }


                p.innerText = element.trackName;

                audio.setAttribute("controls", "controls");
                audio.setAttribute("src", element.src);


                div.className = "albums__tracks-item";
                div.appendChild(p);
                div.appendChild(audio);
                inner.appendChild(div);


            });
        }


    }
})