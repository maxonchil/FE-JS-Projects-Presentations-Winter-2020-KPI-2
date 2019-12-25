let users_counter = 0;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("create-accountForm__submit")[0].onclick = () => {
        let reg_userName = document.querySelectorAll("[name='user-name']")[0].value;
        let reg_userEmail = document.querySelectorAll("[name='user-email']")[0].value;
        let reg_userPassword = document.querySelectorAll("[name='user-password']")[0].value;
        let reg_userPassword2 = document.querySelectorAll("[name='user-password2']")[0].value;
        if (reg_userPassword !== reg_userPassword2) {
            alert("Passwords do not match!");
            return;
        } else {
            reg_userPassword = reg_userPassword2;
        }

        let reg_userData = {
            "user_name": reg_userName,
            "user_email": reg_userEmail,
            "user_password": reg_userPassword
        }

        if (localStorage.getItem("id0") === null) {
            localStorage.setItem(`id${users_counter}`, JSON.stringify(reg_userData));
            users_counter++;
            console.log(users_counter);
            return;
        } else {
            for (let i = 0; i < users_counter; i++) {
                if (JSON.parse(localStorage.getItem(`id${i}`)).user_email === reg_userEmail) {
                    alert("A user with this email is alredy registered")
                    return;
                } else {
                    reg_userEmail = reg_userEmail;
                }
            }
            for (let i = 0; i < users_counter; i++) {
                if (JSON.parse(localStorage.getItem(`id${i}`)).user_name === reg_userName) {
                    alert("A user with this name is already registered ")
                    return;
                } else {
                    reg_userName = reg_userName;
                }
            }
        }

        localStorage.setItem(`id${users_counter}`, JSON.stringify(reg_userData));
        users_counter++;
    }


})