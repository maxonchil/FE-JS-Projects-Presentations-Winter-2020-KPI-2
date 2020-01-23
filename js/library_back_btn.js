document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementsByClassName("library__top-back")[0].onclick = () => {
        useSoundTracks(soundtracks_base);
        document.getElementsByClassName("library__top-back")[0].className += " hidden";
    }
})