//new user
class User{
    constructor(name, lastname, pic){
        this.name = name;
        this.lastname = lastname;
        this.profilePic = pic;
    }
    get fullname(){
        return `${this.name} ${this.lastname}`;
    }
}
let username = new User("Lucas", "Lyra", "pic/profile.jpg")

//new post
class Posting{
    constructor(postQuery, user){
        this.postQuery = postQuery;
        this.user = user
        this.input = document.querySelector(".post-box-input");
        this.input.addEventListener("keypress", (event) => {
            if (event.keyCode == 13) { 
                event.preventDefault();
                if(this.input.value ==  ""){
                    return;
                } else {
                    this.newPost();
                    this.input.value = "";}
                }
                });
                
            }
            newPost(){
                let postText = this.input.value;
                let postBody = new Actions(postText,this.user);~
                this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
            }
        };

//someone post
class Posts{
    constructor(postQuery, input, user){
        this.postQuery = postQuery;
        this.user = user
        this.input = input;
    }
    newPost(){
        let postText = this.input;
        let postBody = new Actions(postText,this.user);~
        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
    }
};

class Body{
    constructor(text, user){
        this.el = document.createElement("div");
        this.el.classList.add("post");
        this.el.innerHTML = 
        `
        <div class="user-posting">
            <img src="${user.profilePic}" alt="${user.fullname} Profile" class="post-profile">
        <div class="user-posting-name-time">
            <span class="username-posting"> ${user.fullname}</span>
            <span class="time-posting">Now</span>
            <i class="fas fa-globe"></i>
        </div>
            <div class="post-user-options">
            <i class="fas fa-ellipsis-h post-hover"></i>
            <span class="cool-arrow-post"></span>
        <div class="post-hover-box">
            <span class="post-hover-options post-hover-delete">Delete</span>
            <span class="post-hover-options post-hover-edit">Edit</span>
            <span class="post-hover-options post-hover-something">Something</span>
        </div>
        </div>
        </div>
        `;
        this.textEl = document.createElement("span");
        this.textEl.classList.add("post-content");
        this.textEl.innerHTML = text;
        this.el.appendChild(this.textEl);

        
        this.removeButton = this.el.querySelector('.post-hover-delete');
        this.removeButton.addEventListener('click', () => this.remove());
        
        this.somethingButton = this.el.querySelector(".post-hover-something");
        this.somethingButton.addEventListener('click', () => this.something());

        this.editButton = this.el.querySelector(".post-hover-edit");
        this.editButton.addEventListener('click', () => {
            if( this.textEl.classList.contains("edit-active")){
                this.textEl.classList.remove("edit-active");
                this.el.replaceChild(this.textEl, this.editArea)
                } else {
                    this.textEl.classList.add("edit-active");
                    this.edit();
                }})
    };
    remove() {
        this.el.parentNode.removeChild(this.el);
    };
    something(){
        alert("*** JUST SOMETHING! ***")
    };
    edit(){

        this.editArea = document.createElement("textarea");
        this.editArea.classList.add("edit-active");

        this.editArea.value = this.textEl.innerHTML;
        this.el.replaceChild(this.editArea, this.textEl);

        this.editArea.addEventListener('keypress', (event) => {
            if (event.keyCode == 13) { 
                event.preventDefault();
                this.textEl.innerHTML = this.editArea.value;
                this.textEl.classList.remove("edit-active");
                this.el.replaceChild(this.textEl, this.editArea);
              }})
              
    }
};

class Actions extends Body{
    constructor(text,user){
        super(text,user);
        //like, comments, share
        this.postAction = document.createElement("div");
        this.postAction.classList.add("post-action");
        this.postAction.innerHTML =  
        `
        <div class="post-like">
            <i class="far fa-thumbs-up"></i>
            <span>Like</span>
        </div>
        <div class="post-comment">
            <i class="far fa-comment-alt"></i>
            <span>Comment</span>
        </div>
        <div class="post-share">
            <i class="fas fa-share"></i>
            <span>Share</span>
        </div>
        `;

        this.likeButton = this.postAction.querySelector(".post-like");
        this.likeButton.addEventListener('click', () => this.like());

        //likesAmount
        this.el.appendChild(this.postAction);
        this.postLikes = document.createElement("div");
        this.postLikes.classList.add("post-likes");
        
        this.postLikes.innerHTML = 
        `<i class="fas fa-thumbs-up"></i>
        `;
        
        this.likesAmount = document.createElement("span");
        this.likesAmount.classList.add("likes-amount");
        this.likesAmount.innerHTML = 0;
        this.hide(this.likesAmount.innerHTML);
        this.postLikes.appendChild(this.likesAmount);
        this.el.appendChild(this.postLikes);
        
     
    };
    hide(value){
        if (value == 0){
        this.postLikes.classList.add("hide")
        } else { this.postLikes.classList.remove("hide") }
    }
    like(){
        if(this.likeButton.classList.contains("clicked")){
            this.likeButton.classList.remove("clicked");
            this.likesAmount.innerHTML--;
            this.hide(this.likesAmount.innerHTML);
        } else {
            this.likeButton.classList.add("clicked");
            this.likesAmount.innerHTML++;
            this.hide(this.likesAmount.innerHTML);
        }
    }
}
        
new Posting(document.querySelector(".posted"), username);