window.localStorage.removeItem('firstName');
window.localStorage.removeItem('lastName');

class Login{
    constructor(){
    this.button = document.querySelector(".login-button");
    this.loginButton()
    this.loginPic()
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

    loginPic(){
        this.pictureOpt = document.querySelectorAll("#loginPic");
        window.localStorage.setItem('profilePic', this.pictureOpt[0].value)
        this.pictureOpt.forEach( (pic) => { pic.addEventListener('click',() => this.picListener(pic.value)) } )

    }

    picListener(pic){
        window.localStorage.setItem('profilePic', pic)
    }
}

let aaa = new Login
