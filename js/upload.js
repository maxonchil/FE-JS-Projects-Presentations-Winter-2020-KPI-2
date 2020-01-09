document.querySelector(".header__upload").onclick = (event) => {
    if (/^logIn/.test(document.cookie)) {
        let input_upload = document.getElementById("upload");
        input_upload.onchange = () => {
            for (i = 0; i < input_upload.files.length; i++) {
                console.log(input_upload.files[i].name);
            }
        }

    } else {
        alert("Please login first or create acount!")
        event.preventDefault();
        return;
    }
}