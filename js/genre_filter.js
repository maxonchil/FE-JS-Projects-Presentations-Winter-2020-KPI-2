const SOUNDTRACKS_DATA = require('./soundtracks_library.js');
document.addEventListener("DOMContentLoaded", function () {

    //Collect all elements that filter by genre
    let genre_items = Array.from(document.getElementsByClassName("aside__icon"))
        .concat(Array.from(document.getElementsByClassName("header__submenu-span")));

    //Find songs by the corresponding genre and pass them to the function to display on page
    genre_items.forEach((item) => {
        item.onclick = (e) => {
            SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base.filter(element => element.genre === e.target.dataset.genre))
        }
    })
})