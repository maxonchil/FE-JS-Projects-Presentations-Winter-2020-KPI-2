document.addEventListener("DOMContentLoaded", function() {
    let aside_items = document.getElementsByClassName("aside__icon");
    let submenu_items = document.getElementsByClassName("header__submenu-span");
    for(let i = 0; i < aside_items.length; i++) {
        aside_items[i].onclick = (element) => {
           let filtred =  soundtracks_base.filter(e=>e.genre === element.target.dataset.genre)
           useSoundTracks(filtred);
        }
    }
    for(let i = 0; i < submenu_items.length; i++) {
        submenu_items[i].onclick = (element) => {
            let filtred =  soundtracks_base.filter(e=>e.genre === element.target.dataset.genre);
            useSoundTracks(filtred);
        }
    }
       
    
})