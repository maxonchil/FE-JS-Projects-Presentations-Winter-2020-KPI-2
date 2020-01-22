document.addEventListener("DOMContentLoaded", () => {
    let rate_container = document.getElementsByClassName("library__main-rate"),
        rate_input = document.getElementsByClassName("library__main-checkbox"),
        rating,
        rate_track,
        curent_container;

    if (/^logIn/.test(document.cookie) ) {
        for (let i = 0; i < rate_container.length; i++) {
            if (rate_container[i].classList.contains("none")) {
                rate_container[i].className = "library__main-rate";
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
            rated.push(rate_track);
            localStorage.setItem("rated", JSON.stringify(rated));
            curent_container = rate_container[i];

            document.getElementsByClassName("library__main-rated")[i].innerText = "Voted!";
        }
    }

    for (let i = 0; i < rate_input.length; i++) {
        rate_input[i].onchange = () => {
            rating = rate_input[i].dataset.rating;
            soundtracks_base.map(element => element.trackName === rate_track ? element.rating.push(rating) : false);
            curent_container.className += " none";
        }

    }

})

