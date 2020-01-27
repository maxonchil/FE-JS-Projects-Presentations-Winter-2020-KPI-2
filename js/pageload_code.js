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
        Array.from(document.getElementsByClassName("library__main-audio"),
            e => e.classList.contains("audio-loged") ?
            true :
            e.className += " audio-loged");


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
            localStorage.setItem("rated", "[]");
            Array.from(document.getElementsByClassName("library__main-audio"), e => e.className = "library__main-audio");
        }
    }
})