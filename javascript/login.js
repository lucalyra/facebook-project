window.localStorage.removeItem('firstName');
window.localStorage.removeItem('lastName');

class Login{
    constructor(){
    this.button = document.querySelector(".login-button");
    this.loginButton()
    }

    loginButton(){
        this.button.addEventListener("click", () =>{
            this.firstName = document.querySelector("#firstName");
            this.lastName = document.querySelector("#lastName");
            window.localStorage.setItem('firstName', this.firstName.value);
            window.localStorage.setItem('lastName', this.lastName.value);
            this.login();
        })
    }

    login(){
        window.location.href = "index.html"
    }
}

new Login