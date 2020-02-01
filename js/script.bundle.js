let users_base;
//Create a promise of AJAX request to set up a item on localeStorage first and then use it
async function ajax_usersBase() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', '../users_base.json');
        xhr.send();
    })
}
//Check by async function is in localeStorage exist users base or not. 
(async () => {
    let data;
    if (!localStorage.getItem("users_base")) {
        data = await ajax_usersBase();
        localStorage.setItem("users_base", data);
    } else {
        data = localStorage.getItem("users_base");
    }
    registration(JSON.parse(data));
})();

function registration(data) {
    //Create an array with all users
    users_base = data;


    //Selected all needed DOM elements
    document.getElementsByClassName("create-accountForm__submit")[0].onclick = () => {
        let reg_userName = document.querySelector("[name='user-name']").value,
            reg_userEmail = document.querySelector("[name='user-email']").value,
            reg_userPassword = document.querySelector("[name='user-password']").value,
            reg_userPassword2 = document.querySelector("[name='user-password2']").value,
            reg_errorEmail = document.querySelector(".create-accountForm__errorEmail"),
            reg_erroName = document.querySelector(".create-accountForm__errorName"),
            reg_errorPas = document.querySelector(".create-accountForm__errorPas"),
            reg_successForm = document.querySelector(".create-accountForm__success"),
            reg_createForm = document.querySelector("[name='create-acctountForm']"),
            reg_userData = {
                "user_name": reg_userName,
                "user_email": reg_userEmail,
                "user_password": reg_userPassword
            };

        //Registration check 
        if (!/\w+@\w+\.\w+/i.test(reg_userEmail)) {
            reg_errorEmail.innerText = "Please use a correct email";
            return;
        }
        if (reg_userPassword.length < 5) {
            reg_errorPas.innerText = "Password must be longer than 5 characters";
            reg_errorEmail.innerText = "";
            return;
        } else if (reg_userPassword !== reg_userPassword2) {
            reg_errorPas.innerText = "Passwords do not match";
            reg_errorEmail.innerText = "";
            return;
        }

        //If users_base  is undefined (ajax require is fail) then set up in localeStorage new key with user data
        if (users_base === undefined) {
            ((key, item) => {
                try {
                    localStorage.setItem(key, item);
                    users_base = [reg_userData];
                } catch (error) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem(key, item);
                        users_base = [reg_userData];
                    }
                }
            })("users_base", JSON.stringify([reg_userData]))

            //Clean all fields and error messages when reg is done
            reg_createForm.style.display = "none";
            reg_successForm.style.display = "block";

            document.querySelectorAll("input[name^='user-']").forEach(e => {
                e.value = "";
            })
            reg_errorEmail.innerText = "";
            reg_erroName.innerText = "";
            reg_errorPas.innerText = "";
            return;

        } else {
            //If 'users_base' is not undefined(ajax require is ok), then get users numbers by array.length
            let users_counter = users_base.length;

            //Check on taken nickname and email
            for (let i = 0; i < users_counter; i++) {
                if (users_base[i].user_name.toLowerCase() === reg_userName.toLowerCase()) {
                    reg_erroName.innerText = "Nickname is already taken";
                    reg_errorPas.innerText = "";
                    reg_errorEmail.innerText = "";
                    return;
                }
            }
            for (let i = 0; i < users_counter; i++) {
                if (users_base[i].user_email.toLowerCase() === reg_userEmail.toLowerCase()) {
                    reg_errorEmail.innerText = "This email is alredy used";
                    reg_erroName.innerText = "";
                    reg_errorPas.innerText = "";
                    return;
                }
            }

            users_base.push(reg_userData);


            ((key, item) => {
                try {
                    localStorage.setItem(key, item);
                } catch (error) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem(key, item);
                    }
                }
            })("users_base", JSON.stringify(users_base))

            reg_createForm.style.display = "none";
            reg_successForm.style.display = "block";

            document.querySelectorAll("input[name^='user-']").forEach(e => {
                e.value = "";
            })
            reg_errorEmail.innerText = "";
            reg_erroName.innerText = "";
            reg_errorPas.innerText = "";
        }

    }
    //Sign in form functionality
    document.querySelector(".sign-inForm__submit").onclick = () => {
        let signIn_log = document.querySelector("[name='sign-inLog']").value,
            signIn_pas = document.querySelector("[name='sign-inPas']").value,
            createAcc_btn = document.querySelector(".header__registration-createAccount"),
            signIn_btn = document.querySelector(".header__registration-signIn"),
            logOut_btn = document.querySelector(".sign-inForm__logOut"),
            signIN_success = document.querySelector(".sign-inForm__success"),
            users_counter = users_base.length,
            user_index = 0,
            check_log = false,
            check_pas = true;

        //Looking for a registred user with entered nickname
        for (let i = 0; i < users_counter; i++) {
            if (signIn_log === users_base[i].user_name) {
                check_log = true;
                user_index = i;
                break;
            }
        }

        //If entered nickname allready registred, then compare the correctness of the entered password
        signIn_pas === users_base[user_index].user_password ? check_pas = true : check_pas = false;

        //If log check and pas chek is ok, then user loged in
        if (check_log === true && check_pas === true) {
            let rate_container = document.getElementsByClassName("library__main-rate");

            document.getElementById("reg_controler1").checked = 'checked'
            createAcc_btn.style.display = "none";
            signIn_btn.style.display = "none";
            logOut_btn.style.display = "block";
            signIN_success.innerText = `Hi, ${users_base[user_index].user_name}`;
            signIN_success.style.display = "block";

            document.cookie = "logIn=" + user_index + ";";

            document.querySelectorAll("input[name^='sign-in']").forEach(e => {
                e.value = "";
            })
            document.querySelector(".sign-inForm__error").innerText = "";

            for (let i = 0; i < rate_container.length; i++) {
                rate_container[i].classList.toggle("none", false);
            }

            //If user loged in, then show him logout button
            logOut_btn.onclick = () => {
                document.cookie = "logIn=" + user_index + ";" + "max-age=0;";
                logOut_btn.style.display = "none";
                signIN_success.style.display = "none";
                createAcc_btn.style.display = "block";
                signIn_btn.style.display = "block";
                document.querySelector(".create-accountForm__success").style.display = "none";
                document.querySelector("[name='create-acctountForm']").style.display = "block";

                for (let i = 0; i < rate_container.length; i++) {
                    rate_container[i].className += " none";
                    rate_text[i].innerText = "";
                }
                rated = [];

                try {
                    localStorage.setItem(localStorage.setItem("rated", "[]"));
                } catch (error) {
                    alert(error.name)
                }
                
                Array.from(document.getElementsByClassName("library__main-audio"), e => e.classList.toggle("audio-loged", false));
            }
            Array.from(document.getElementsByClassName("library__main-audio"), e => e.classList.toggle("audio-loged", true));
            //If no such username or password is wrong, show message
        } else {
            document.querySelectorAll("input[name^='sign-in']").forEach(e => {
                e.value = "";
            })
            document.querySelector(".sign-inForm__error").innerText = "Wrong email or password";
        }
    }
}
//Create a promise of AJAX request to set up a item on localeStorage first and then use it

var soundtracks_base;
var rated = [];

if (/^logIn/.test(document.cookie)) {
    if (localStorage.getItem("rated")) {
        rated = JSON.parse(localStorage.getItem("rated"));
    } else {
        localStorage.setItem("rated", "[]");
    }

} else {
    localStorage.setItem("rated", "[]");
}

async function ajax_soundtracks() {
    return new Promise(function (resolve, reject) {
        let xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                resolve(xhr2.responseText);
            }
        }
        xhr2.open('GET', 'soundtracks_base.json');
        xhr2.send();
    })

}

//Check by async function is in localeStorage exist soundracks base or not. 

(async () => {
    let data;
    if (!localStorage.getItem("soundtracks_base")) {
        data = await ajax_soundtracks();
        localStorage.setItem("soundtracks_base", data);
    } else {
        data = localStorage.getItem("soundtracks_base");
    }
    soundtracks_base = JSON.parse(data);
    useSoundTracks();
})();



//Main function to work with data
function useSoundTracks(filtred) {

    let soundtracks_array; //temporary storage for the data that will be displayed to the user

    //If no search results, then show message and if user in not on main library, then show him 'Back to main library' button

    if (filtred === undefined) {
        document.getElementsByClassName("library__top-back")[0].className += " hidden";
        soundtracks_array = soundtracks_base.slice();
    } else {
        document.getElementsByClassName("library__top-back")[0].className += "library__top-back";
        soundtracks_array = filtred;

    }
  
    localStorage.setItem("soundtrack_array", JSON.stringify(soundtracks_array));
    
    let max_page = Math.ceil(soundtracks_array.length / 10),
        controls_list = document.querySelector(".library__bottom-controls"),
        pages = Math.ceil(soundtracks_array.length / 10) >= 5 ? 5 : Math.ceil(soundtracks_array.length / 10);


    //Added pagination controls 
    if (controls_list.hasChildNodes()) {
        while (controls_list.firstChild) {
            controls_list.removeChild(controls_list.firstChild);
        }
    }
    if (pages !== 1) {
        let first_li = document.createElement("li");
        first_li.className = "library__bottom-beginning-btn";
        controls_list.appendChild(first_li).innerText = "< First page";

        for (let i = 1; i <= pages; i++) {
            let li = document.createElement("li"),
                btn = document.createElement("button");

            li.className += "controls-btn";
            btn.className = "library__bottom-controlsItem";
            li.appendChild(btn).innerText = i;
            controls_list.appendChild(li);
        }

        let last_li = document.createElement("li");
        last_li.className = "library__bottom-end-btn";
        controls_list.appendChild(last_li).innerText = "Last page >";
    }


    //Selected controls, audio elements and their 'p' tag for show a soundtrack name and set up src
    let library_titles = document.querySelectorAll(".library__main-title"),
        library_audio = document.querySelectorAll(".library__main-audio"),
        library_controls = document.querySelectorAll(".library__bottom-controlsItem"),
        library_containers = document.getElementsByClassName("library__main-item"),
        rate_container = document.getElementsByClassName("library__main-rate"),
        rate_input = document.getElementsByClassName("library__main-checkbox"),
        rate_text = document.getElementsByClassName("library__main-rated"),
        no_mutches = document.getElementsByClassName("library__main-nomatches")[0];

    //Function for rewriting innerText of controls when user click on it
    function controllersRedrawing(left_shift, basic_page, active_e) {
        let counter = left_shift;
        library_controls.forEach(function (e) {
            if (e.classList.contains("library__bottom-controlsItem-active")) {
                e.className = "library__bottom-controlsItem";
            }
            e.innerText = basic_page + counter;
            counter++;
        })
        library_controls[active_e].className += "-active";
    }


    //Сontent output function
    function displayContent(array) {
        if (/^logIn/.test(document.cookie)) {
            for (let i = 0; i < rate_input.length; i++) {
                rate_input[i].checked = false;
            }
        }
        for (let i = 0; i < 10; i++) {
            if (array[i] === undefined) {
                library_containers[i].classList.toggle("none", true);
            } else {
                // no_mutches.toggle("none", true);
                no_mutches.classList.toggle("none", true);
                library_containers[i].classList.toggle("none", false);
                library_titles[i].innerText = array[i].trackName;
                library_audio[i].setAttribute("src", array[i].src);
                if (/^logIn/.test(document.cookie)) {
                    rate_container[i].classList.toggle("none", false);
                    rate_container[i].setAttribute("data-track", array[i].trackName);
                    if (rated.length !== 0) {
                        if (rated.indexOf(array[i].trackName) !== -1) {
                            rate_container[i].classList.toggle("none", true);
                            rate_text[i].innerText = "Voted!"
                        } else {
                            rate_text[i].innerText = "";

                        }
                    }
                } else {
                    rate_container[i].classList.toggle("none", true);
                }

            }

            if (array.length === 0) {
                while (controls_list.firstChild) {
                    controls_list.removeChild(controls_list.firstChild);
                }
                no_mutches.classList.toggle("none", false);

            }

        }

    }

    // Display songs and their names to the page
    displayContent(soundtracks_array);

    //Added '-active' class to set up defoult chosed controler
    library_controls[0] === undefined ? true : library_controls[0].className += "-active";


    //Added event on all library controls (pagination functionality)
    for (let i = 0; i < library_controls.length; i++) {

        library_controls[i].onclick = (e) => {

            let curent_page = +e.target.innerText,
                soundtracks_count = library_controls[i].innerText + 0,
                show_on_page = soundtracks_array.slice(+soundtracks_count - 10, +soundtracks_count);

            displayContent(show_on_page);

            //Redrawing Controls when user click on it
            if (curent_page === max_page) {
                for (let i = 0; i < library_controls.length; i++) {
                    if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                }
                e.target.className += "-active"

            } else if (max_page - curent_page === 1) {
                if (library_controls.length < 5) {
                    for (let i = 0; i < library_controls.length; i++) {
                        if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                            library_controls[i].className = "library__bottom-controlsItem";
                        }
                    }
                    library_controls[library_controls.length - 2].className += "-active";
                } else {
                    controllersRedrawing(-4, max_page, 3);
                }

            } else if (curent_page >= 3) {
                controllersRedrawing(-2, curent_page, 2);

            } else if (curent_page === 2) {

                controllersRedrawing(1, 0, 1);

            } else {
                for (let i = 0; i < library_controls.length; i++) {
                    if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                }
                e.target.className += "-active"
            }

        }
    }

    if (document.querySelector(".library__bottom-beginning-btn")) {

        document.querySelector(".library__bottom-beginning-btn").onclick = () => {
            displayContent(soundtracks_array);
            controllersRedrawing(1, 0, 0);
        }
        document.querySelector(".library__bottom-end-btn").onclick = (e) => {
            let tracks_count = soundtracks_array.length % 10 === 0 ? 10 : soundtracks_array.length % 10,
                show_on_page = soundtracks_array.slice(-tracks_count);

            displayContent(show_on_page);

            if (library_controls.length === 5) {
                controllersRedrawing(-4, max_page, 4);
            } else {
                for (let i = 0; i < library_controls.length; i++) {
                    if (library_controls[i].classList.contains("library__bottom-controlsItem-active")) {
                        library_controls[i].className = "library__bottom-controlsItem";
                    }
                }
                library_controls[library_controls.length - 1].className += "-active";
            }

        }

    }
    //Event for 'go to first page' button


    //Event for 'go to last page' button

}
document.getElementsByClassName("header__upload-button")[0].onclick = (event) => {
    let upload_form = document.getElementsByClassName("header__upload-form")[0],
        upload_btn = document.getElementsByClassName("header__upload-button")[0],
        upload_input = document.getElementById("upload"),
        upload_genre;

    if (/^logIn/.test(document.cookie)) {
        upload_form.classList.toggle("active", true);

        //Close upload form if click somewhere else
        document.onclick = (e) => {
            if (
                e.target !== upload_btn &&
                e.target !== upload_form &&
                !upload_form.contains(e.target)
            ) {
                upload_form.classList.remove("active");
            }
        }

        //Get genre of song (value of option)
        Array.from(document.getElementsByClassName("header__upload-option"),
            (e) => {
                e.onclick = () => {
                    upload_genre = e.value;
                }
            })

        //When file uploaded, add it to global variable and LS
        upload_input.onchange = () => {

            for (i = 0; i < upload_input.files.length; i++) {

                let upload_song = {
                    src: "music/" + upload_input.files[i].name,
                    trackName: upload_input.files[i].name.split(".mp3")[0],
                    genre: upload_genre,
                    album: "uploaded",
                    rating: []
                }

                soundtracks_base.push(upload_song);

                try {
                    localStorage.setItem("soundtracks_base", JSON.stringify(soundtracks_base));
                } catch (e) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem("soundtracks_base", JSON.stringify(soundtracks_base));
                    }
                }
            }
            upload_form.classList.toggle("active", false);
        }

    } else {
        alert("Please login first or create acount!")
    }
}
document.addEventListener("DOMContentLoaded", function () {
    //Take together all items for filtering by genre
    let genre_items = Array.from(document.getElementsByClassName("aside__icon"))
        .concat(Array.from(document.getElementsByClassName("header__submenu-span")));

    genre_items.forEach((item) => {
        item.onclick = (e) => {
            useSoundTracks(soundtracks_base.filter(element => element.genre === e.target.dataset.genre))
        }
    })
})
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
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementsByClassName("library__top-back")[0].onclick = () => {
        useSoundTracks(soundtracks_base);
        document.getElementsByClassName("library__top-back")[0].className += " hidden";
    }
})
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("albums__item-checked").checked = true;

    let albums = document.getElementsByClassName("albums__cover"),
        inner = document.getElementsByClassName("albums__tracks-inner")[0],
        top_inner = document.getElementsByClassName("albums__track-top")[0];

    for (let i = 0; i < albums.length; i++) {
        albums[i].onchange = () => {

            if (inner.children.length > 0) {
                while (inner.firstChild) {
                    inner.removeChild(inner.firstChild);
                }
            }


            soundtracks_base.filter(e => e.album === albums[i].dataset.album).forEach(element => {

                let div = document.createElement("div"),
                    p_title = document.createElement("p"),
                    p = document.createElement("p"),
                    audio = document.createElement("audio");

                if (document.getElementsByClassName("albums__tracks-title").length === 0) {
                    p_title.className = "albums__tracks-title";
                    p_title.innerText = element.album;
                    top_inner.appendChild(p_title);
                } else {
                    document.getElementsByClassName("albums__tracks-title")[0].innerText = element.album;
                }


                p.innerText = element.trackName;

                audio.setAttribute("controls", "controls");
                audio.setAttribute("src", element.src);


                div.className = "albums__tracks-item";
                div.appendChild(p);
                div.appendChild(audio);
                inner.appendChild(div);


            });
        }


    }
})
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
document.addEventListener("DOMContentLoaded", () => {

    //If page was reloaded, rewriting registration elements
    if (/^logIn/.test(document.cookie)) {
        let rate_container = document.getElementsByClassName("library__main-rate"),
            createAcc_btn = document.querySelector(".header__registration-createAccount"),
            signIn_btn = document.querySelector(".header__registration-signIn"),
            logOut_btn = document.querySelector(".sign-inForm__logOut"),
            signIN_success = document.querySelector(".sign-inForm__success"),
            rate_text = document.getElementsByClassName("library__main-rated");

        document.getElementById("reg_controler1").checked = 'checked';
        createAcc_btn.style.display = "none";
        signIn_btn.style.display = "none";
        logOut_btn.style.display = "block";
        signIN_success.innerText = `Hi, ${users_base[document.cookie.split("=")[1]].user_name}`;
        signIN_success.style.display = "block";

        Array.from(document.getElementsByClassName("library__main-audio"),  e => e.classList.toggle("audio-loged", true));


        //If page was reloaded, add event on logou btn
        logOut_btn.onclick = () => {
            document.cookie = "logIn=" + [document.cookie.split("=")[1]] + ";" + "max-age=0;";
            logOut_btn.style.display = "none";
            createAcc_btn.style.display = "block";
            signIn_btn.style.display = "block";
            signIN_success.style.display = "none";
            for (let i = 0; i < rate_container.length; i++) {
                rate_container[i].className += " none";
                rate_text[i].innerText = "";
            }

            rated = [];

            try {
                localStorage.setItem("rated", "[]");
            } catch (error) {
                alert(error.name);
            }

            Array.from(document.getElementsByClassName("library__main-audio"), e => e.classList.toggle("audio-loged", false));
        }
    }
})
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
                    return useSoundTracks(array.sort(sort_functions.string(direction)));

                case "rating":
                    return useSoundTracks(
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