let tracks_base = JSON.parse(localStorage.getItem("tracks_base"));


let library_titles = document.querySelectorAll(".library__main-title"),
library_audio = document.querySelectorAll(".library__main-audio");
for(let i = 0; i < 10; i++ ) {
    library_titles[i].innerHTML = tracks_base[i].trackName;
    library_audio[i].setAttribute("src", tracks_base[i].src);
}

