const SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", () => {

    let sum = (a, ...rest) => rest.length !== 0 ? a + sum(...rest) : a;

    let sort_functions = {
        number: (direction) => direction === "up" ? (a, b) => a.rating[0] - b.rating[0] : (a, b) => b.rating[0] - a.rating[0],
        string: (direction) => {
            switch (direction) {
                case "up":
                    return (a, b) => {
                        if (a.trackName > b.trackName) {
                            return -1;
                        } else if (a.trackName < b.trackName) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
                case "down":
                    return (a, b) => {
                        if (b.trackName > a.trackName) {
                            return -1;
                        } else if (b.trackName < a.trackName) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
            }

        }
    }

    Array.from(document.getElementsByClassName("library__sort-item"), (e) => {
        e.onclick = () => {
            let direction = e.dataset.direction,
                key = e.value,
                array = JSON.parse(localStorage.getItem("soundtrack_array"));

            switch (key) {
                case "trackName":
                    return SOUNDTRACKS_DATA.useSoundTracks(array.sort(sort_functions.string(direction)));

                case "rating":
                    return SOUNDTRACKS_DATA.useSoundTracks(
                        array.filter(e => e.rating.length)
                        .map(x => ({
                            ...x,
                            rating: [sum(...x.rating)]
                        }))
                        .sort(sort_functions.number(direction)));
            }
        }
    })

    Array.from(document.getElementsByClassName("sort_top-10"), (e) => {
        e.onclick = () => {
            let sort_genre = e.dataset.genre,
                sorted = SOUNDTRACKS_DATA.soundtracks_base.filter(e => e.genre === sort_genre && e.rating.length).map((x) => ({
                    ...x,
                    rating: sum(...x.rating)
                }));

            sorted.length >= 10 ?
                SOUNDTRACKS_DATA.useSoundTracks(sorted.slice(0, 10).sort(sort_functions.number("down"))) :
                SOUNDTRACKS_DATA.useSoundTracks(sorted.sort(sort_functions.number("down")));
        }
    })
})