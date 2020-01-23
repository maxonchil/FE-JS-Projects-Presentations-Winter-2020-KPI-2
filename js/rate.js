document.addEventListener("DOMContentLoaded", () => {
    let rate_container = document.getElementsByClassName("library__main-rate"),
        rate_input = document.getElementsByClassName("library__main-checkbox"),
        rate_text = document.getElementsByClassName("library__main-rated"),
        rating,
        rate_track,
        curent_index;

    if (/^logIn/.test(document.cookie)) {
        for (let i = 0; i < rate_container.length; i++) {
            if (rated.indexOf(rate_container[i].dataset.track) !== -1) {
                rate_container[i].classList.contains("none") ? true : rate_container[i].className += " none";
                rate_text[i].innerText = "Voted!"
            } else {
                rate_container[i].classList.contains("none") ? rate_container[i].className = "library__main-rate" : false;
                rate_text[i].innerText = ""
            }
        }
    } else {
        for (let i = 0; i < rate_container.length; i++) {
            rate_container[i].className += " none";
        }
    }


    for (let i = 0; i < rate_container.length; i++) {
        rate_container[i].onclick = () => {

            rate_track = rate_container[i].dataset.track;
            curent_index = i;
        }
    }

    for (let i = 0; i < rate_input.length; i++) {
        rate_input[i].onchange = () => {
            rating = rate_input[i].dataset.rating;

            soundtracks_base.map(element => element.trackName === rate_track ? element.rating.push(rating) : false);

            rate_container[curent_index].className += " none";
            document.getElementsByClassName("library__main-rated")[curent_index].innerText = "Voted!";
            rated.push(rate_track);
            localStorage.setItem("rated", JSON.stringify(rated));
        }
    }

})