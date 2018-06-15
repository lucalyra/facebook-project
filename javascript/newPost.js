class User{
    constructor(name, lastname){
        this.name = name;
        this.lastname = lastname;
        this.profilePic = "pic/profile.jpg";
    }
    get fullname(){
        return `${this.name} ${this.lastname}`;
    }
}
class Posts{
    constructor(postQuery){
        this.postQuery = postQuery;
        this.user = new User("Lucas", "Lyra");
        this.input = document.querySelector(".post-box-input");
        this.input.addEventListener("keypress", (event) => {
            if (event.keyCode == 13) { 
                event.preventDefault();
                if(this.input.value ==  ""){
                    return;
                } else {
                this.newPost();
                this.input.value = "";
                window.focus()};}
        });
        
    }
    newPost(){
        let postText = this.input.value;
        let postBody = new Likes(postText,this.user);~
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
                    <span class="post-hover-options post-hover-delete"> Delete </span>
                    <span class="post-hover-options post-hover-something">Something</span>
            </div>
        </div>
        </div>
        <span class="post-content">${text}</span>
        `;};
    };
    class Actions extends Body{
    constructor(text,user){
        super(text,user);
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
        this.el.appendChild(this.postAction);
    };
    }
    class Likes extends Actions{
        constructor(text,user){
        super(text,user);
        this.postLikes = document.createElement("div");
        this.postLikes.classList.add("post-likes");
        this.postLikes.innerHTML = 
        `<i class="fas fa-thumbs-up"></i>
            <span class="likes-amount">${Math.ceil(Math.random()*100)}</span>
         `;
        this.el.appendChild(this.postLikes);
        };
    };
    new Posts(document.querySelector(".posted"));