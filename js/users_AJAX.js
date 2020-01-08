let xhr = new XMLHttpRequest();
xhr.open('GET', '../users_base.json', false);
xhr.send();
if(xhr.status !== 200) {
    alert("AJAX request is failed");
}else {
   localStorage.setItem("users_base", xhr.responseText);
}