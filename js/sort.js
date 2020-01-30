document.addEventListener("DOMContentLoaded", () => {
    let a;

    function sum(a, ...rest) {
        return rest.length !== 0 ? a + sum(...rest) : a;
    }
    let sort_functions = {
        number: (direction) => direction === true ? (a, b) => b.rating - a.rating : (a, b) => a.rating - b.rating
    }

    let my_summ = (key, direction) => {
        switch (key) {
            case "number":
                return sort_functions.number(direction);
        }
    }
    let sort_controls = document.getElementsByClassName("library__sort-item");
    Array.from(sort_controls, (e) => {
        e.onclick = () => {
            a = soundtracks_base.filter(e => e.rating.length).map((x) => ({
                    ...x,
                    rating: sum(...x.rating)
                })

            );
            console.log(a)
            console.log(soundtracks_base)
            console.log(a.sort(my_summ("number", true)));
        }
    })


})