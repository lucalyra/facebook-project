let username = JSON.parse(localStorage.getItem('username'))

function checkLogin(){

    if(window.localStorage.username == null || username.name == "" || username.lastname == "" || username.profilePic == ""){
        alert("Your name or your last name is missing.");
        window.location.href = "login.html"
    } else { return }

}
checkLogin();
