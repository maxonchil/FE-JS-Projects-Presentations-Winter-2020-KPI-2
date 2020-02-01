const SOUNDTRACKS_DATA = require('./soundtracks_library.js');
document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("library__top-back")[0].onclick = () => {
        SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base);
        document.getElementsByClassName("library__top-back")[0].className += " hidden";
    }
})