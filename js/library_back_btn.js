const SOUNDTRACKS_DATA = require('./soundtracks_library.js');
document.addEventListener("DOMContentLoaded", () => {

    //Onclick 'back button' pass all songs from the database to the function for displaying content on page
    document.getElementsByClassName("library__top-back")[0].onclick = () => {
        SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base);
        document.getElementsByClassName("library__top-back")[0].className += " hidden";
    }
})