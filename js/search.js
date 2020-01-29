document.addEventListener("DOMContentLoaded", () => {

    //Search functionality for btn activate
    document.getElementsByClassName("icon__search")[0].onclick = () => {
        let search = document.querySelector("[type='search']").value;
        document.getElementById("library").scrollIntoView();
        if (location.hash !== "#library") {
            location.hash = "";
            location.hash += "#library";
        }
        useSoundTracks(soundtracks_base.filter(e => e.trackName.toLowerCase().includes(search.toLowerCase())));
    };

//Search functionality for enter activate
    document.querySelector("[type='search']").addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            let search = document.querySelector("[type='search']").value;
            document.getElementById("library").scrollIntoView();
            if (location.hash !== "#library") {
                location.hash = "";
                location.hash += "#library";
            }
            useSoundTracks(soundtracks_base.filter(e => e.trackName.toLowerCase().includes(search.toLowerCase())));
        }
    })
});