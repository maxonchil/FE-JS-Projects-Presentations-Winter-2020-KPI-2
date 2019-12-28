document.addEventListener("DOMContentLoaded", () => {
    let users_base = JSON.parse(localStorage.getItem('users_base'));
    document.getElementsByClassName("create-accountForm__submit")[0].onclick = () => {
        let reg_userName = document.querySelector("[name='user-name']").value,
            reg_userEmail = document.querySelector("[name='user-email']").value,
            reg_userPassword = document.querySelector("[name='user-password']").value,
            reg_userPassword2 = document.querySelector("[name='user-password2']").value,
            reg_userData = {
                "user_name": reg_userName,
                "user_email": reg_userEmail,
                "user_password": reg_userPassword
            };
        if (!/\w+@\w+\.\w+/i.test(reg_userEmail)) {
            document.querySelector(".create-accountForm__errorEmail").innerHTML = "Please use a correct email";
            return;
        }
        if (reg_userPassword.length < 5) {
            document.querySelector(".create-accountForm__errorPas").innerHTML = "Password must be longer than 5 characters";
            return;
        } else if (reg_userPassword !== reg_userPassword2) {
            document.querySelector(".create-accountForm__errorPas").innerHTML = "Passwords do not match";
            return;
        }

        if (localStorage.getItem("users_base") === null) {
            let lsKey = "users_base",
                lsValue = JSON.stringify([{
                    "users_counter": 1
                }, reg_userData]);

            ((key, item) => {
                try {
                    localStorage.setItem(key, item);
                    users_base = [{
                        "users_counter": 1
                    }, reg_userData];
                } catch (error) {
                    if (error.name === "QUOTA_EXCEEDED_ERR" || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        localStorage.clear();
                        localStorage.setItem(key, item);
                        users_base = [{
                            "users_counter": 1
                        }, reg_userData];
                    }
                }
            })(lsKey, lsValue)
            document.querySelector("[name='create-acctountForm']").style.display = "none";
            document.querySelector(".create-accountForm__success").style.display = "block";
            return;
        } else {
            let users_counter = users_base[0].users_counter;
            //start loop from i = 1 becouse of inde 0 is a users counter
            for (let i = 1; i <= users_counter; i++) {
                if (users_base[i].user_name === reg_userName) {
                    document.querySelector(".create-accountForm__errorName").innerHTML = "Nickname is already taken";
                    return;
                }
            }
            for (let i = 1; i <= users_counter; i++) {
                if (users_base[i].user_email === reg_userEmail) {
                    document.querySelector(".create-accountForm__errorEmail").innerHTML = "This email is alredy used";
                    return;
                }
            }

            users_base.push(reg_userData);
            users_base[0].users_counter++
            let lsKey ="users_base",
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
            document.querySelector("[name='create-acctountForm']").style.display = "none";
            document.querySelector(".create-accountForm__success").style.display = "block";
        }


    }

    document.querySelector(".sign-inForm__submit").onclick = () => {
        let signIn_log = document.querySelector("[name='sign-inLog']").value,
            signIn_pas = document.querySelector("[name='sign-inPas']").value,
            createAcc_btn = document.querySelector(".header__registration-createAccount"),
            signIn_btn = document.querySelector(".header__registration-signIn"),
            logOut_btn = document.querySelector(".sign-inForm__logOut"),
            signIN_success = document.querySelector(".sign-inForm__success"),
            users_counter = users_base[0].users_counter,

            user_index = 0,
            check_log = false,
            check_pas = true;
        for (let i = 1; i <= users_counter; i++) {
            if (signIn_log === users_base[i].user_name) {
                check_log = true;
                user_index = i;
                break;
            }
        }
        signIn_pas === users_base[user_index].user_password ? check_pas = true : check_pas = false;
        if (check_log === true && check_pas === true) {
            document.getElementById('rc1').checked = 'checked';
            createAcc_btn.style.display = "none";
            signIn_btn.style.display = "none";
            logOut_btn.style.display = "block";
            signIN_success.innerHTML = `Hi, ${users_base[user_index].user_name}`;
            signIN_success.style.display = "block";
            document.cookie = `username = ${users_base[user_index].user_name}`;


            logOut_btn.onclick = () => {
                document.cookie = `username = ${users_base[user_index].user_name}; max-age=0`;
                logOut_btn.style.display = "none";
                signIN_success.style.display = "none";
                createAcc_btn.style.display = "block";
                signIn_btn.style.display = "block";
                document.querySelector('.create-accountForm__success').style.display = "none";
                document.querySelector("[name='create-acctountForm']").style.display = "block";

            }

        } else {
            document.querySelector(".sign-inForm__error").innerHTML = "Wrong email or password";
        }


    }

    document.querySelector(".header__upload").onclick = (event) => {
        if (!/^username/.test(document.cookie)) {
            alert("Please login first or create acount!")
            event.preventDefault();
            return;
        } else {
            let input_upload = document.getElementById("upload");
            input_upload.onchange = () => {
                for (i = 0; i < input_upload.files.length; i++) {
                    console.log(input_upload.files[i].name);
                }
            }


        }
    }
})