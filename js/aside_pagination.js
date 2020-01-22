document.addEventListener("DOMContentLoaded", function () {
    //Take together all items for filtering by genre
    let genre_items = Array.from(document.getElementsByClassName("aside__icon"))
    .concat(Array.from(document.getElementsByClassName("header__submenu-span")));

    Array.from(genre_items, (item) => {
        item.onclick = (e) => {
            useSoundTracks(soundtracks_base.filter(element => element.genre === e.target.dataset.genre))
        }
    })
})