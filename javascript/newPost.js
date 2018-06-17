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
            if (event.keyCode == 10) {
                if(this.input.value == (this.input.keyCode == 13)){
                    alert("Looks like your post is empty, try writing something.");
                } else {
                    this.newPost1();
                    this.input.value = "";
                    this.input.blur()
                } } } );      
            }
            newPost1(){
                let postBody = new Actions(this.input.value,this.user);~
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
        let postBody = new Actions(this.input,this.user);~
        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
    }
};

class Body{
    constructor(text, user){
        this.el = document.createElement("div");
        this.el.classList.add("post");
        this.el.innerHTML = //User posting
            `<div class="user-posting">
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
            </div>`;
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
        this.editArea.focus();
        this.editArea.addEventListener('keypress', (event) => {
            if (event.keyCode == 10) { 
                if(this.editArea.value == (this.editArea.keyCode == 13)){
                    alert("Looks like your post is empty, try writing something.");
                } else {
                this.textEl.innerHTML = this.editArea.value;
                this.textEl.classList.remove("edit-active");
                this.el.replaceChild(this.textEl, this.editArea);
                }
            }
        }) 
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
            this.hideLike(this.likesAmount.innerHTML);
            this.postLikes.appendChild(this.likesAmount);
            this.el.appendChild(this.postLikes);   

            //comments
            this.commenting = document.createElement("div"); //create comments box
            this.commenting.classList.add("post-commenting");
            this.commenting.classList.add("hide"); //hide comments box
            this.commenting.innerHTML = 
            `<textarea class="commenting-textarea" placeholder="Commenting..."></textarea>
                <span class="comment-button">Add Comment</span>
                </div> `
            this.el.appendChild(this.commenting);   

            this.commentButton = this.postAction.querySelector(".post-comment"); //comment button
            this.commentButton.addEventListener('click', () => this.openComments(user)); 
            this.addComment = this.commenting.querySelector(".comment-button"); //add comment button
            this.addComment.addEventListener('click', () => this.submitComment())

            this.commentInput = this.commenting.querySelector(".commenting-textarea"); //send comment when press ctrl+enter
            this.commentInput.addEventListener('keypress', (event) => {
                if (event.keyCode == 10) { 
                    this.submitComment()} else {return}});

    };

    hideLike(value){ 
        if (value == 0){
        this.postLikes.classList.add("hide")
        } else { this.postLikes.classList.remove("hide") }
    }

    like(){
        if(this.likeButton.classList.contains("clicked")){
            this.likeButton.classList.remove("clicked");
            this.likesAmount.innerHTML--;
            this.hideLike(this.likesAmount.innerHTML);
        } else {
            this.likeButton.classList.add("clicked");
            this.likesAmount.innerHTML++;
            this.hideLike(this.likesAmount.innerHTML);
        }
    };

    openComments(){
        if(this.commenting.classList.contains("hide")){
            this.commentButton.classList.add("clicked");
            this.commenting.classList.remove("hide");
        }   else {
                this.commenting.classList.add("hide");
                this.commentButton.classList.remove("clicked");
                this.commenting.querySelector(".commenting-textarea").value  = "";
            }

    };

    submitComment(){
        this.commentInput = this.commenting.querySelector(".commenting-textarea").value;
        this.commentBox = document.createElement("div");
        this.commentBox.classList.add("comments-box")
        this.commentBox.innerHTML = 
        `
        <img src="${username.profilePic} " alt="${username.fullname} Profile" class="post-profile">
        <span class="username-commenting"> ${username.fullname}</span>
        <span class="comment-content"> ${this.commentInput} </span>
        <div class="comments-actions">
            <span class="comment-like">Like</span>
            <span class="comment-comment">Reply</span>
            <span class="comment-time"> Now </span>
        </div> `;
        this.commenting.appendChild(this.commentBox);
    };
}

new Posting(document.querySelector(".posted"), username);