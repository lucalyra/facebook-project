// header more options
class MoreOptions{
    constructor(){
        this.moreOptions = document.querySelector(".more-options");
        this.moreButton = document.querySelector(".more-button")
        this.moreBox = document.querySelector(".more-options-box");
        this.logoutButton = document.querySelector(".more-options-logout");
        this.openMore()
        this.logoutActivate()
    }

    openMore(){
        this.moreButton.addEventListener("click",() => { if( this.moreBox.classList.contains("hide") ) {
            this.moreBox.classList.remove("hide")
        } else { this.moreBox.classList.add("hide") }
         } ) }
    
    logoutActivate(){
        this.logoutButton.addEventListener("click", () => this.logout())
    }

    logout(){
        window.location.href = "login.html";
        window.localStorage.removeItem('username');
    }
}
new MoreOptions
