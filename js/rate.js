document.addEventListener("DOMContentLoaded", () => {
    let rate_container = document.getElementsByClassName("library__main-rate"),
        rate_input = document.getElementsByClassName("library__main-checkbox"),
        rate_number,
        rate_track,
        curent_container,
        e_target;

    if (/^logIn/.test(document.cookie)) {
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
            curent_container = rate_container[i];
            
            e_target = document.getElementsByClassName("library__main-item")[i]

        }
    }

    for (let i = 0; i < rate_input.length; i++) {
        rate_input[i].onchange = () => {
            rate_number = rate_input[i].dataset.rate;
            console.log(rate_number);
            soundtracks_base.map(element => element.trackName === rate_track ? element.rating.push(rate_number) : false);
            rate_input[i].className += " none";
            curent_container.className += " none";

            let span = document.createElement("span");
            span.innerText = "Rated!";
            span.className = "library__main-rated"
            e_target.appendChild(span);
        }

    }



})

// for (let i = 0; i < rate_container.length; i++) {
//     rate_container[i].onclick = (e) => {
//         rate_track = rate_container[i].dataset.track;
//     }
// }
// for (let i = 0; i < rate_input.length; i++) {
//     rate_input[i].onclick = () => {
//         rate_number = rate_input[i].dataset.rate;
//     }
// }