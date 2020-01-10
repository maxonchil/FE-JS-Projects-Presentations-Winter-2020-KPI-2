let xhr = new XMLHttpRequest();

//get users base
xhr.open('GET', '../tracks_base.json', false);
xhr.send();
if(xhr.status !== 200) {
    alert("AJAX request is failed");
}else {
   localStorage.setItem("tracks_base", xhr.responseText);
}

//get soundtracks base
xhr.open('GET', '../users_base.json', false);
xhr.send();
if(xhr.status !== 200) {
    alert("AJAX request is failed");
}else {
   localStorage.setItem("users_base", xhr.responseText);
}