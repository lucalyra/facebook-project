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


function time(){
    let d = new Date();
    let day = d.getDay();
    let hr = d.getHours();
    let min = d.getMinutes();
    let time = hr + ":" + min;
    return  time;
}

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
                    this.newPost();
                    this.input.value = "";
                    this.input.blur();
                } } } );
        window.addEventListener("scroll", () => {this.activateView()});
        
    };

    newPost(){
        let postBody = new Actions(this.input.value,this.user);~
        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
    } 


    activateView(){
    if (this.view() == false){this.input.blur()};
    }
    view(){ 
        let newPPost = document.querySelector('.new-post');
        let bounding = newPPost.getBoundingClientRect();
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
            return true;
        } else {
            return false;
        }
    }

}1;


//random post
class Posts{
    constructor(postQuery, input, user){
        this.postQuery = postQuery;
        this.user = user
        this.input = input;
    }
    newPost(){
        let postBody = new Actions(this.input,this.user);
        let likesAmount = postBody.postLikes.querySelector(".likes-amount");
        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
        this.randomLikes(likesAmount);
    }
    randomLikes(body){
       body.innerHTML = Math.ceil(Math.random()*100);
       if (body.innerText > 0){
            body.parentNode.classList.remove("hide");
       } 
    }
};

class Body{
    constructor(text, user){
        this.el = document.createElement("div");
        this.el.classList.add("post");

        this.userPosting = document.createElement("div");
        this.userPosting.classList.add("user-posting");
        this.userPosting.innerHTML = 
            `<img src="${user.profilePic}" alt="${user.fullname} Profile" class="post-profile">
            <div class="user-posting-name-time">
                <span class="username-posting"> ${user.fullname}</span>
                <span class="time-posting">${time()}</span>
                <i class="fas fa-globe"></i>
            </div>`;
        this.el.appendChild(this.userPosting);

        this.textEl = document.createElement("span");
        this.textEl.classList.add("post-content");
        this.textEl.innerHTML = text;

        this.userOptions = new UserOptions(this.el, this.textEl);
        
        this.userPosting.appendChild(this.userOptions.userOptions);
        this.el.appendChild(this.textEl);
   
    };

};
class UserOptions{
    constructor(el,text){
        this.userOptions = document.createElement("div");
        this.userOptions.className = "post-user-options";
        this.userOptions.innerHTML = 
        `<i class="fas fa-ellipsis-h post-hover"></i>
        <span class="cool-arrow-post"></span>
        `;
        this.hoverBox = document.createElement("div");
        this.hoverBox.className = "post-hover-box";
        this.userOptions.appendChild(this.hoverBox);

        this.removeButton(el);
        this.editButton(el,text);
        this.somethingButton();
    }
    removeButton(el){
        this.delete = document.createElement("span");
        this.delete.classList.add("post-hover-options");
        this.delete.classList.add("post-hover-delete");
        this.delete.innerText = "Delete";
        this.hoverBox.appendChild(this.delete);

        this.delete.addEventListener('click', () => this.remove(el));
    }
    remove(el) {
        el.parentNode.removeChild(el);
    };

    somethingButton(){
        this.something = document.createElement("span");
        this.something.classList.add("post-hover-options");
        this.something.classList.add("post-hover-something");
        this.something.innerText = "Something";
        this.hoverBox.appendChild(this.something);

        this.something.addEventListener('click', () => this.somethingAlert());
    }
    somethingAlert(){
        alert("*** JUST SOMETHING! ***");
    };

    editButton(el,text){
        this.edit = document.createElement("span");
        this.edit.classList.add("post-hover-options");
        this.edit.classList.add("post-hover-edit");
        this.edit.innerText = "Edit";
        this.hoverBox.appendChild(this.edit);

        this.edit.addEventListener('click', () => {
            if( text.classList.contains("edit-active")){
                text.classList.remove("edit-active");
                el.replaceChild(text, this.editArea)
                } else {
                    text.classList.add("edit-active");
                    this.editing(el,text);
                }})
    }
    
    editing(el,text){
        this.editArea = document.createElement("textarea");
        this.editArea.classList.add("edit-active");
        this.editArea.value = text.innerHTML;
        el.replaceChild(this.editArea, text);
        this.editArea.focus();
        this.editArea.addEventListener('keypress', (event) => {
            if (event.keyCode == 10) { 
                if(this.editArea.value == (this.editArea.keyCode == 13)){
                    alert("Looks like your post is empty, try writing something.");
                } else {
                    text.innerHTML = this.editArea.value;
                    text.classList.remove("edit-active");
                el.replaceChild(text, this.editArea);
                }
            }
        }) 
    }
  

}
class Actions extends Body{
    constructor(text,user){
        super(text,user);
            //like, comments, share
            this.postAction = document.createElement("div");
            this.postAction.classList.add("post-action");
            this.postAction.innerHTML =  
            `
            <div class="post-like" id="like-buttn">
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

            //likes
            this.likes = new Likes(this.el, this.postAction);
            this.likes.likeButton(this.postAction);
            this.likes.likesAmount(this.el);

            //comments
            this.comments = new Comments(this.el, this.postAction, username);

    };
}

class Comments{
    constructor(el, postAction, user){
        this.commenting = document.createElement("div"); //create comments box
        this.commenting.classList.add("post-commenting");
        this.commenting.classList.add("hide"); //hide comments box
        this.commenting.innerHTML = 
        `<textarea class="commenting-textarea" placeholder="Commenting..."></textarea>
            <span class="comment-button">Add Comment</span>
            </div> `
        el.appendChild(this.commenting); 
        this.commentButton(postAction);
        this.submitButton(user);
    }

    commentButton(postAction){
        this.commentButton = postAction.querySelector(".post-comment"); //comment button
        this.commentButton.addEventListener('click', () => this.openComments()); 
    };

    submitButton(user){
        this.addComment = this.commenting.querySelector(".comment-button"); //add comment button
        this.addComment.addEventListener('click', () => this.submitComment(user));
        
        this.commentInput = this.commenting.querySelector(".commenting-textarea"); //send comment when press ctrl+enter
        this.commentInput.addEventListener('keypress', (event) => {
            if (event.keyCode == 10) { 
                this.submitComment(user)} else {return}});
    }
    
    openComments(){ //open the comment container
        if(this.commenting.classList.contains("hide")){
            this.commentButton.classList.add("clicked");
            this.commenting.classList.remove("hide");
        }   else {
                this.commenting.classList.add("hide");
                this.commentButton.classList.remove("clicked");
                this.commenting.querySelector(".commenting-textarea").value  = "";
            }

    };

    submitComment(user){ //add new comment // ** need to make it shorter **
        this.commentInput = this.commenting.querySelector(".commenting-textarea");
        this.commentBox = document.createElement("div");
        this.commentBox.classList.add("comments-box");
        this.userComment = document.createElement("div");
        this.userComment.classList.add("user-comment");
        this.userComment.innerHTML = 
        `
        <img src="${user.profilePic} " alt="${user.fullname} Profile" class="post-profile">
        <span class="username-commenting"> ${user.fullname}</span>`;

        this.commentContent = document.createElement("span");
        this.commentContent.className = "comment-content";
        this.commentContent.innerText = this.commentInput.value;
        this.userComment.appendChild(this.commentContent);

        this.userOptions = new UserOptions(this.userComment, this.commentContent);
        this.userComment.appendChild(this.userOptions.userOptions);

        this.commentsActions = document.createElement("div");
        this.commentsActions.classList.add("comments-actions");
        this.commentsActions.innerHTML=
            `<span class="comment-like" id="like-buttn">Like</span>
            <span class="comment-reply">Reply</span>
            <span class="comment-time"> Now </span>`;
        this.commentBox.appendChild(this.userComment);
        this.commenting.appendChild(this.commentBox);
        this.userComment.appendChild(this.commentsActions);
        this.commentInput.value = "";
        this.commentInput.blur();
        this.commentLikes = new Likes;
        this.commentLikes.likeButton(this.commentsActions);
        this.commentLikes.likesAmount(this.userComment);

    };
}

class Likes{
    constructor(){
        this.postLikes = document.createElement("div");
        this.postLikes.classList.add("likes");
        this.postLikes.innerHTML = 
        `<i class="fas fa-thumbs-up"></i>`;
    }

    likeButton(postAction){
        this.likeButton = postAction.querySelector("#like-buttn");
        this.likeButton.addEventListener('click', () => this.like());
    }

    likesAmount(el){ //standart likes amount for new post
            this.likesAmount = document.createElement("span");
            this.likesAmount.classList.add("likes-amount");
            this.likesAmount.innerHTML = 0;
            this.hideLike(this.likesAmount.innerHTML);
            this.postLikes.appendChild(this.likesAmount);
            el.appendChild(this.postLikes);   
    }
    
    hideLike(value){ //check if there is more than 0 likes
        if (value == 0){
        this.postLikes.classList.add("hide")
        } else { this.postLikes.classList.remove("hide") }
    }
    
    like(){ // add or remove likes and checks if there more than 0 likes
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
}

class Response { // ** WORKING ON IT **
    constructor(user,comment){
        this.fullname = user.fullname;
        this.profilePic = user.profilePic;
        this.commentBox = comment
        this.replyButton = this.commentBox.querySelector(".comment-reply");
        this.replyButton.addEventListener("click", () => this.openReply(this.replyButton))
    }

    openReply(replyButton){

        this.inputReplyBox = document.createElement("div");
        this.inputReplyBox.classList.add("reply-input-box");
        this.replyProfile = document.createElement("img");
        this.replyProfile.classList.add("post-profile");
        this.replyProfile.src = this.profilePic;
        this.input = document.createElement("textarea");
        this.input.classList.add("comment-reply-input");
        this.input.placeholder = "Reply";
        this.inputReplyBox.appendChild(this.replyProfile);
        this.inputReplyBox.appendChild(this.input);
        this.commentBox.appendChild(this.inputReplyBox);
        this.replyBoxStyle = parseInt(window.getComputedStyle(this.inputReplyBox.previousSibling).marginLeft,10);
        this.inputReplyBox.style.marginLeft = this.replyBoxStyle + 15 + "px";
        this.input.addEventListener('keypress', (event) => {
            if (event.keyCode == 10) { 
                this.submitReply(this.input.value,this.replyProfile, this.inputReplyBox)} else {return}});

    }

    submitReply(input,profile,oldBox){
        this.newBox = document.createElement("div");
        this.newBox.classList.add("user-comment");
        this.replyText = document.createElement("span");
        this.replyText.classList.add("comment-content");
        this.replyText.innerText = input;
        this.replyUser= document.createElement("span");
        this.replyUser.classList.add("username-commenting");
        this.replyUser.innerText = username.fullname;
        this.replyProfile = profile;
        this.replyAction = document.createElement("div");
        this.replyAction.classList.add("comments-actions");
        this.replyAction.innerHTML = `
       <div class="comments-actions">
            <span class="comment-like">Like</span>
            <span class="comment-reply">Reply</span>
            <span class="comment-time"> Now </span>
        </div> `;
        this.newBox.appendChild(this.replyAction);
        this.newBox.appendChild(this.replyText);
        this.newBox.appendChild(this.replyUser);
        this.newBox.appendChild(this.replyProfile);
        this.commentBox.appendChild(this.newBox);
        this.replyBoxStyle = parseInt(window.getComputedStyle(this.newBox.previousSibling).marginLeft,10);
        this.newBox.style.marginLeft = this.replyBoxStyle + 15 + "px";
        this.commentBox.removeChild(oldBox);

        this.replyButton = this.newBox.querySelector(".comment-reply");
        this.replyButton.addEventListener("click", () => this.openReply())

    }
}

fetch('http://127.0.0.1:3000')
  .then((response) => {
    response.json()
      .then((res) => {
        res.posts.forEach(elm => {
            let user = new User(elm.firstName, elm.lastName, elm.profile)
            new serverPost(elm.message, user, elm.likes, elm.time,elm.useId).createPost();
        });
      });
  });


class serverPost {
    
    constructor(text, user, likes, time, id){
        this.id = id;
        this.user = user;
        this.message = text;
        this.likes = likes;
        this.time = time;
        // this.comments = comments;
        this.postQuery = document.querySelector(".posted");
    }

    createPost(){
        let postBody = new Actions(this.message, this.user);

        let likesAmount = postBody.likes.postLikes.querySelector(".likes-amount");
        likesAmount.innerHTML = this.likes;
        postBody.likes.hideLike(this.likes);

        let time = postBody.el.querySelector(".time-posting");
        time.innerHTML = this.time;

        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
        
        //still need to add comments
    }
    
}
new Posting(document.querySelector(".posted"), username);



