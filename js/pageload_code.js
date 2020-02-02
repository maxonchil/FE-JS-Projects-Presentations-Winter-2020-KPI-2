const SOUNDTRACKS_DATA = require('./soundtracks_library.js');
const USERS_DATA = require('./registration.js');


document.addEventListener("DOMContentLoaded", () => {

    //If page was reloaded and user logen id, redraw the page in accordance with the fact that the user is logged in
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
        signIN_success.innerText = `Hi, ${USERS_DATA.users_base[document.cookie.split("=")[1]].user_name}`;
        signIN_success.style.display = "block";

        Array.from(document.getElementsByClassName("library__main-audio"), e => e.classList.toggle("audio-loged", true));


        //If page was reloaded, add event on logout btn
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

            SOUNDTRACKS_DATA.rated = [];

            try {
                localStorage.setItem("rated", "[]");
            } catch (error) {
                alert(error.name);
            }

            Array.from(document.getElementsByClassName("library__main-audio"), e => e.classList.toggle("audio-loged", false));
        }
    }
})