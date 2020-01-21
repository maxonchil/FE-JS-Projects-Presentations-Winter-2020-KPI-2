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
            let lsKey = "users_base",
                lsValue = JSON.stringify([reg_userData]);

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
            })(lsKey, lsValue)

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

            let lsKey = "users_base",
                lsValue = JSON.stringify(users_base);

            ((key, item) => {
                try {
                    localStorage.setItem(key, item);
                } catch (error) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem(key, item);
                    }
                }
            })(lsKey, lsValue)

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
                if (rate_container[i].classList.contains("none")) {
                    rate_container[i].className = "library__main-rate";
                }
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

                for(let i = 0; i < rate_container.length; i ++) {
                    rate_container[i].className += " none";
                }
            }

            //If no such username or password is wrong, show message
        } else {
            document.querySelectorAll("input[name^='sign-in']").forEach(e => {
                e.value = "";
            })
            document.querySelector(".sign-inForm__error").innerText = "Wrong email or password";
        }
    }
}