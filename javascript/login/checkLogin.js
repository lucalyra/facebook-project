let username = JSON.parse(localStorage.getItem('username'))

function checkLogin(){

    if(window.localStorage.username == null || username.name == "" || username.lastname == "" || username.profilePic == ""){
        window.location.href = "login.html"
    } else { return }

}
checkLogin();
