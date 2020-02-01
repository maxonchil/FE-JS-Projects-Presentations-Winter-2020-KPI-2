const SOUNDTRACKS_DATA = require('./soundtracks_library.js');
document.addEventListener("DOMContentLoaded", function () {
    //Take together all items for filtering by genre
    let genre_items = Array.from(document.getElementsByClassName("aside__icon"))
        .concat(Array.from(document.getElementsByClassName("header__submenu-span")));

    genre_items.forEach((item) => {
        item.onclick = (e) => {
            SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base.filter(element => element.genre === e.target.dataset.genre))
        }
    })
})