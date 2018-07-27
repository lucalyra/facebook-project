// window.localStorage.removeItem('firstName');
// window.localStorage.removeItem('lastName');
window.localStorage.removeItem('username')

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
            // window.localStorage.setItem('firstName', this.firstName.value);
            // window.localStorage.setItem('lastName', this.lastName.value);
            this.newUser();
            this.login();
        })
    }
    newUser(){
        this.user = new User(this.firstName.value, this.lastName.value, this.profilePic);
        this.user.fullname;
        window.localStorage.setItem('username', JSON.stringify(this.user));

    }

    login(){
        window.location.href = "index.html"
    }

    loginPic(){
        this.pictureOpt = document.querySelectorAll("#loginPic");
        this.profilePic = this.pictureOpt[0].value
        this.pictureOpt.forEach( (pic) => { pic.addEventListener('click',() => this.picListener(pic.value)) } )

    }

    picListener(pic){
        // window.localStorage.setItem('profilePic', pic)
        this.profilePic = pic
    }
}


let aa = new Login
