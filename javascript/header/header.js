// header more options
class MoreOptions{
    constructor(){
        this.moreOptions = document.querySelector(".more-options");
        this.moreButton = document.querySelector(".more-button")
        this.moreBox = document.querySelector(".more-options-box");
        this.logoutButton = document.querySelector(".more-options-logout");
        this.settingsButton = document.querySelector(".more-options-settings")
        this.openMore()
        this.logoutActivate()
        this.openSettings()
    }

    openMore(){
        this.moreButton.addEventListener("click",() => { if( this.moreBox.classList.contains("hide") ) {
            this.moreBox.classList.remove("hide")
        } else { this.closeMore()  }
         } )
    }

    closeMore(){
        this.moreBox.classList.add("hide")
    }
    
    logoutActivate(){
        this.logoutButton.addEventListener("click", () => this.logout())
    }

    logout(){
        window.location.href = "login.html";
        window.localStorage.removeItem('username');
    }

    openSettings(){
        this.settingsButton.addEventListener("click", () => new Settings)
    }
}
let moreOptions = new MoreOptions 

class Settings{
    constructor(){
        this.createSettingsBox();
        moreOptions.closeMore();
    }

    createSettingsBox(){
        this.settingBackground = document.createElement("div");
        this.settingBackground.className = "setting-background";
        this.settingBox = document.createElement("div");
        this.settingBox.className = "setting-box";
        this.settingBox.innerHTML = 
        `<div class="input-box">
            <span class="input-span">Change your name</span> 
            <input class="name-input" placeholder="First Name">
            <input class="lastname-input" placeholder="Last Name">
        </div>
        <span class="picture-span">Choose a new picture</span> 
        `
        this.changePic();
        this.settingBackground.appendChild(this.settingBox);
        this.close = new SettingsClose(this.settingBox);
        this.submit = new SettingsSubmit(this.settingBox,this.close);

        document.body.insertBefore(this.settingBackground, document.body.childNodes[0]);
   }

   changePic(){
       this.picOptions = document.createElement("div");
       this.picOptions.className = "picture-options";
       this.picOptions.innerHTML = 
       `
       <label>
           <input type="radio" name="profile-pic" id="loginPic" value="pic/giraffe.jpg"/>
           <img src="pic/giraffe.jpg" class="pic">
       </label>
       <label>
           <input type="radio" name="profile-pic" id="loginPic" value="pic/cow.jpg"/>
           <img src="pic/cow.jpg" class="pic">
       </label>
       <label>
           <input type="radio" name="profile-pic" id="loginPic" value="pic/fox.jpg"/>
           <img src="pic/fox.jpg" class="pic">
       </label>
       <label>
           <input type="radio" name="profile-pic" id="loginPic" value="pic/panda.jpeg"/>
           <img src="pic/panda.jpeg" class="pic">
       </label>
       <label> 
           <input type="radio" name="profile-pic" id="loginPic" value="pic/parrot.jpg"/>
           <img src="pic/parrot.jpg" class="pic">
       </label>
       <label>
           <input type="radio" name="profile-pic" id="loginPic" value="pic/puppy.jpg"/>
           <img src="pic/puppy.jpg" class="pic">
       </label>
       `
       this.settingBox.appendChild(this.picOptions);
   }

}

class SettingsSubmit{
    constructor(settingBox,close){
        this.settingBox = settingBox;
        this.close = close;
        this.settingBackground = this.settingBox.parentNode;
        this.submitBox();
    }
    submitBox(){
        this.submitBox = document.createElement("div");
        this.submitBox.className = "submit-box";

        this.submitButton();
        this.cancelButton();

        this.settingBox.appendChild(this.submitBox)

    }
    submitButton(){
        this.submitButton =document.createElement("div");
        this.submitButton.className = "submit-button";
        this.submitSpan = document.createElement("span");
        this.submitSpan.className = 'submit-span';
        this.submitSpan.innerText = "Submit";

        this.submitButton.appendChild(this.submitSpan);
        this.submitBox.appendChild(this.submitButton)
        this.submitListener();
    }
    submitListener(){
        this.submitButton.addEventListener('click', () => this.submitConfirm())
    }
    submit(){
        if(this.name.value !== ""){
            username.name = this.name.value;
        };
        if(this.lastname.value !== ""){
            username.lastname = this.lastname.value;
        }
        username.fullname = username.name + " " + username.lastname;
        window.localStorage.setItem('username', JSON.stringify(username));
        this.close.close();
        updateUserPage()


    }

    submitConfirm(){
        this.name = this.settingBox.querySelector(".name-input")
        this.lastname = this.settingBox.querySelector(".lastname-input")
        this.confirm = confirm(`You're changing your name to ${this.name.value} ${this.lastname.value}, are you sure?`)
        if( this.confirm == true){
            this.submit()
        }
    }
    cancelButton(){
        this.cancelButton =document.createElement("div");
        this.cancelButton.className = "cancel-button";
        this.cancelSpan = document.createElement("span");
        this.cancelSpan.className = 'cancel-span';
        this.cancelSpan.innerText = "Cancel";
        this.cancelButton.appendChild(this.cancelSpan);
        this.submitBox.appendChild(this.cancelButton)
        this.cancelListener();
    }
    cancelListener(){
        this.cancelButton.addEventListener("click", () => this.close.close());
    }
}
class SettingsClose{
    constructor(settingBox){
        this.settingBox = settingBox
        this.settingBackground = this.settingBox.parentNode;
        this.closeButton()
        this.clickOutBox()
    }

    closeButton(){
        this.closeButton =document.createElement("div");
        this.closeButton.className = "close-button";
        this.closeSpan = document.createElement("span");
        this.closeSpan.className = 'close-span';
        this.closeSpan.innerText = "X";
        this.closeButton.appendChild(this.closeSpan);
        this.settingBox.insertBefore(this.closeButton,this.settingBox.childNodes[0]);
        // this.settingBox.appendChild(this.closeButton)
        this.buttonListener();
    }
    buttonListener(){
        this.closeButton.addEventListener("click", () => this.close())
    }
    clickOutBox(){
        this.settingBackground.addEventListener("click", (event) =>{if(event.target == this.settingBackground){this.close()}})
    }

    close(){
        this.settingBackground.parentNode.removeChild(this.settingBackground);
    }
}