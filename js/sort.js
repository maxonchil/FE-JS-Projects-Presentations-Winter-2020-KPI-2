document.addEventListener("DOMContentLoaded", () => {

    sum = (a, ...rest) => rest.length !== 0 ? a + sum(...rest) : a;

    let sort_functions = {
        number: (direction) => direction === "up" ? (a, b) => a.rating - b.rating : (a, b) => b.rating - a.rating,
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

    let sort_type = (key, direction) => {
        switch (key) {
            case "rating":
                return sort_functions.number(direction);
            case "trackName":
                return sort_functions.string(direction);
        }
    }

    Array.from(document.getElementsByClassName("library__sort-item"), (e) => {
        e.onclick = () => {
            let direction = e.dataset.direction,
                key = e.value,
                sorted = soundtracks_array.filter(e => e.rating.length).map((x) => ({
                        ...x,
                        rating: sum(...x.rating)
                    })

                );
            useSoundTracks(sorted.sort(sort_type(key, direction)));
        }
    })

    Array.from(document.getElementsByClassName("sort_top-10"), (e) => {
        e.onclick = () => {
            let sort_genre = e.dataset.genre,
                sorted = soundtracks_base.filter(e => e.genre === sort_genre && e.rating.length).map((x) => ({
                    ...x,
                    rating: sum(...x.rating)
                }));
                
            sorted.length >= 10 ?
                sorted = sorted.slice(0, 10).sort(sort_type("rating", "down")) :
                sorted = sorted.sort(sort_type("rating", "down"))

            useSoundTracks(sorted);
        }
    })
})