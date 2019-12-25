document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("create-accountForm__submit")[0].onclick = () => {
        let reg_userName = document.querySelectorAll("[name='user-name']")[0].value,
        reg_userEmail = document.querySelectorAll("[name='user-email']")[0].value,
        reg_userPassword = document.querySelectorAll("[name='user-password']")[0].value,
        reg_userPassword2 = document.querySelectorAll("[name='user-password2']")[0].value,
        email_regexp = /.+@.+\..+/;
        if (reg_userPassword !== reg_userPassword2) {
            alert("Passwords do not match!");
            return;
        } else {
            reg_userPassword = reg_userPassword2;
        }
        if(email_regexp.test(reg_userEmail)) {
            reg_userEmail = reg_userEmail;
        }else {
            alert("Please use a correct email");
            return;
        }

        let reg_userData = {
            "user_name": reg_userName,
            "user_email": reg_userEmail,
            "user_password": reg_userPassword
        }

        if (localStorage.getItem("id0") === null) {
            localStorage.setItem('users_counter', 1);
            localStorage.setItem(`id0`, JSON.stringify(reg_userData));
            return;
        } else {
            let users_counter = +localStorage.getItem('users_counter');
            for (let i = 0; i < users_counter; i++) {
                if (JSON.parse(localStorage.getItem(`id${i}`)).user_name === reg_userName) {
                    alert("A user with this name is already registered ")
                    return;
                } else {
                    reg_userName = reg_userName;
                }
            }
            for (let i = 0; i < users_counter; i++) {
                if (JSON.parse(localStorage.getItem(`id${i}`)).user_email === reg_userEmail) {
                    alert("A user with this email is alredy registered")
                    return;
                } else {
                    reg_userEmail = reg_userEmail;
                }
            }

            localStorage.setItem(`id${users_counter}`, JSON.stringify(reg_userData));
            users_counter++;
            localStorage.setItem('users_counter', users_counter);
        }


    }


})