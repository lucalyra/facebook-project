function checkLogin(){
    if(window.localStorage.firstName == null || window.localStorage.lastName == null){
        window.location.href = "login.html"
    } else { return }
}
checkLogin();
