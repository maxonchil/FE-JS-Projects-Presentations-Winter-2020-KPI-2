document.addEventListener("DOMContentLoaded", () => {
    let rate_container = document.getElementsByClassName("library__main-rate"),
        rate_input = document.getElementsByClassName("library__main-checkbox"),
        rate_text = document.getElementsByClassName("library__main-rated"),
        rating,
        rate_track,
        curent_index;


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

            try {
                localStorage.setItem("rated", JSON.stringify(rated));
            } catch (error) {
                alert(error.name)
            }
        }
    }

})