//real time
function time(){
    let d = new Date();
    let day = d.getDay();
    let hr = d.getHours();
    let min = (d.getMinutes()<10?'0':'') + d.getMinutes()
    let time = hr + ":" + min;
    return  time;
}

//new post
class Posting{
    constructor(postQuery){
        this.postQuery = postQuery;
        this.input = document.querySelector(".post-box-input");
        
        this.enterKeypress();
        this.openPostScroll();  
    };
    enterKeypress(){
        this.input.addEventListener("keypress", (event) => {
            if (event.keyCode == 10) {
                this.checkEmptyPost();
                } } );
    };

    checkEmptyPost(){
        if(this.input.value == (this.input.keyCode == 13)){
            alert("Looks like your post is empty, try writing something.");
        } else {
          this.sendPost(); 
        } 
    }; 

    sendPost(){
        this.newPost();
        this.input.value = "";
        this.input.blur();
    };

    newPost(){
        let postBody = new Actions(this.input.value,username);~
        this.postQuery.insertBefore(postBody.el, this.postQuery.childNodes[0]);
    };

    activateView(){
    if (this.view() == false){this.input.blur()};
    };

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
    openPostScroll(){
        window.addEventListener("scroll", () => {this.activateView()});
    }
};
let postClass = new Posting(document.querySelector(".posted"));


//picture post
class postPicture{ // ** Working on it **
    constructor(){
        this.newPostBox = document.querySelector(".new-post");
        this.postBox = document.querySelector(".post-box")
        this.openPictureBox();
        
    }

    createPictureBox(){
        this.textInput = this.postBox.querySelector(".post-box-input");
        this.profilePic = this.postBox.querySelector(".post-profile");
        this.postPic = document.createElement('img');
        this.postPic.className = "post-image";
        this.postPic.src = "pic/giraffe.jpg";
        this.postBox.appendChild(this.postPic)
        this.boxStyle();
        
    }

    boxStyle(){
        this.profilePic.style.display = "none";
        this.postPic.style.width = "479px"
        this.postPic.style.marginTop = "10px"
        this.postPic.style.order = "0";
        this.textInput.style.width = "90%"
        this.textInput.style.order = "1";
        this.postBox.style.flexDirection = "column";
        console.log(this.newPostBox.style)

    }
    openPictureBox(){
        this.postPicture = document.querySelector(".post-album");
        this.postPicture.addEventListener("click", () => this.createPictureBox())
    }
};

//random post - not in use
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

//post body
class Body{
    constructor(text, user){
        this.el = document.createElement("div");
        this.el.classList.add("post");

        
        
        this.userPosting = $('<div></div>').addClass("user-posting")
            .append($(`<img src="${user.profilePic}" alt="${user.fullname} Profile" class="post-profile">
                <div class="user-posting-name-time">
                    <span class="username-posting"> ${user.fullname}</span>
                    <span class="time-posting">${time()}</span>
                    <i class="fas fa-globe"></i>
                </div>`)).appendTo(this.el) //jQuery
                
        // this.userPosting = document.createElement("div");
        // this.userPosting.classList.add("user-posting");
        // this.userPosting.innerHTML = 
        //     `<img src="${user.profilePic}" alt="${user.fullname} Profile" class="post-profile">
        //     <div class="user-posting-name-time">
        //         <span class="username-posting"> ${user.fullname}</span>
        //         <span class="time-posting">${time()}</span>
        //         <i class="fas fa-globe"></i>
        //     </div>`;
        // this.el.appendChild(this.userPosting);

        this.textEl = document.createElement("span");
        this.textEl.classList.add("post-content");
        this.textEl.innerHTML = text;

        this.userOptions = new UserOptions(this.el, this.textEl);
        this.userOptions.removeButton(this.el);

        this.userPosting.append(this.userOptions.userOptions); //jQuery

        // this.userPosting.appendChild(this.userOptions.userOptions);
        this.el.appendChild(this.textEl);
   
    };

};

//post user options
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

        this.editButton(el,text);
        this.somethingButton();
    }
    removeButton(boxToDelete){
        this.delete = document.createElement("span");
        this.delete.classList.add("post-hover-options");
        this.delete.classList.add("post-hover-delete");
        this.delete.innerText = "Delete";
        this.hoverBox.appendChild(this.delete);

        this.delete.addEventListener('click', () => this.remove(boxToDelete));
    }

    remove(boxToDelete) {
        boxToDelete.parentNode.removeChild(boxToDelete);
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
  

};

//post actions
class Actions extends Body{
    constructor(text,user){
        super(text,user);

        this.postActionBar();

        //likes
        this.likes = new Likes(this.el, this.postAction);
        this.likes.likeButton(this.postAction);
        this.likes.likesAmount(this.el);

        //comments
        this.comments = new Comments(this.el, this.postAction, username);

    };

    //like, comments, share
    postActionBar(){
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

    }
}

//post comments
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
        this.commentInput = this.commenting.querySelector(".commenting-textarea");
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
        this.userOptions.removeButton(this.commentBox);
        this.userComment.appendChild(this.userOptions.userOptions);
        this.commentBox.appendChild(this.userComment);

        this.commentActions = new CommentsActions(this.userComment, this.commentBox); 

        this.commenting.appendChild(this.commentBox);
        this.userComment.appendChild(this.commentActions.commentsActions);
        
        this.commentInput.value = "";
        this.commentInput.blur();
    };



}

// comments actions
class CommentsActions{
    constructor(userComment,commentBox){
    this.commentsActions = document.createElement("div");
    this.commentsActions.classList.add("comments-actions");

    this.createLikes(userComment);
    this.createReply(commentBox,this.commentsActions);
    this.createTime();
    }

    createLikes(userComment){
        this.commentLike = document.createElement("span");
        this.commentLike.className = "comment-like";
        this.commentLike.id = "like-buttn";
        this.commentLike.innerHTML = "Like";
        this.commentsActions.appendChild(this.commentLike);
        this.likes(userComment);
    }
    likes(userComment){
        this.commentLikes = new Likes;
        this.commentLikes.likeButton(this.commentsActions);
        this.commentLikes.likesAmount(userComment);
    }

    createReply(commentBox,commentsActions){
        this.commentReply = document.createElement("span");
        this.commentReply.className = "comment-reply";
        this.commentReply.id = "reply-buttn";
        this.commentReply.innerHTML = "Reply";
        this.commentsActions.appendChild(this.commentReply);
        this.reply(commentBox,this.commentReply,commentsActions);

    }
    reply(commentBox,userComment,commentsActions){
        this.newReply = new Reply(commentBox,userComment,commentsActions);
        
    }
    createTime(){
        this.commentTime = document.createElement("span");
        this.commentTime.className = "comment-time";
        this.commentTime.innerHTML = "Now";
        this.commentsActions.appendChild(this.commentTime);
    }
}

//likes
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

//reply comments
class Reply{
    constructor(commentBox,commentReply,commentsActions){
        this.commentReply = commentReply;
        this.commentsActions = commentsActions;
        this.commentBox = commentBox;
        this.replyButton();



    }
    replyButton(){
     this.commentReply.addEventListener('click', ()=> this.checkIfOpen())
    }

    checkIfOpen(){
        this.child = (this.commentBox.childNodes.length - 1)
        
        if(this.commentBox.childNodes[this.child].firstChild.className == "reply-input-box"){

            console.log( this.child + "-1")
            console.log(this.commentBox.childNodes)
            this.commentBox.removeChild(this.commentBox.childNodes[this.child]);
          
        } else {
            this.openReply()
        }
    }

    openReply(){
        this.createReplyBox();
        this.inputBox = document.createElement("div");
        this.inputBox.className = "reply-input-box";

        this.profilePic = document.createElement("img");
        this.profilePic.className = "post-profile";
        this.profilePic.src = username.profilePic;

        this.userReplying = document.createElement("span");
        this.userReplying.className = "user-reply-name";
        this.userReplying.innerHTML = username.fullname;

        this.textInput = document.createElement("textarea");
        this.textInput.className = "reply-input";
        this.textInput.placeholder = "Replying...";

        this.inputBox.appendChild(this.profilePic);
        this.inputBox.appendChild(this.userReplying);
        this.inputBox.appendChild(this.textInput);
        this.replyBox.appendChild(this.inputBox);
        
        this.textInput.focus();
        this.submitReply()
        this.cancelReply()
        this.applyReplyMargin()

    }
    submitReply(){
        this.textInput.addEventListener('keypress', (event) => {
            if (event.keyCode == 10) { 
                if(this.textInput.value == (this.textInput.keyCode == 13)){
                    alert("Looks like your post is empty, try writing something.")
                } else {
                    this.newReply();
    }}})}

    cancelReply(){
        this.textInput.addEventListener('keyup', (event) => {
            if(event.keyCode == 27){
                this.deleteInputBox();
            };
    })};

    deleteInputBox(){
        this.inputBox.parentNode.removeChild(this.inputBox)
    }

    newReply(){
        this.text = this.textInput.value;

        this.reply = document.createElement("div");
        this.reply.className = "reply";
        this.applyReplyMargin()

        this.profilePic = document.createElement("img");
        this.profilePic.className = "post-profile";
        this.profilePic.src = username.profilePic;

        this.userReplying = document.createElement("span");
        this.userReplying.className = "user-reply-name";
        this.userReplying.innerHTML = username.fullname;

        this.replyContent = document.createElement("span");
        this.replyContent.className = "reply-content";
        this.replyContent.innerHTML = this.text;

        this.reply.appendChild(this.profilePic);
        this.reply.appendChild(this.userReplying);
        this.reply.appendChild(this.replyContent);
        this.replyBox.appendChild(this.reply);

  
        this.addReplyActions()
        this.deleteInputBox();
        this.userOptions = new UserOptions(this.reply, this.replyContent);
        this.userOptions.removeButton(this.replyBox);
        this.reply.appendChild(this.userOptions.userOptions);


    }

    addReplyActions(){
        this.replyActions = new CommentsActions(this.reply, this.replyBox);
        this.reply.appendChild(this.replyActions.commentsActions);
    }

    createReplyBox(){
        this.replyBox = document.createElement("div");
        this.replyBox.className = "reply-box";
        this.commentBox.appendChild(this.replyBox); 
    }

    applyReplyMargin(){
        this.replyBoxStyle = parseInt(window.getComputedStyle( this.commentBox.firstChild).paddingLeft,10);
        this.replyBox.style.paddingLeft = this.replyBoxStyle + 15 + "px";
    }
}


//fetch user and posts from /server/server.js
// fetch('http://127.0.0.1:3000/')
//   .then((response) => {
//     response.json()
//       .then((res) => {
//         res.posts.forEach(elm => {
//             let user = new User(elm.firstName, elm.lastName, elm.profile)
//             new serverPost(elm.message, user, elm.likes, elm.time).createPost();
//         });
//       });
//   });


//create post from server
class serverPost {
    
    constructor(text, user, likes, time){
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
    }
    
}
class CatchUser{
    constructor(user){
        this.fullname = user.name;
        this.profilePic = user.profilePic;
        this.id = user.userId;
        this.username = user.username;
        this.email = user.email;
    }
}

let userService = new UserService;
let postService = new PostService;

class FetchPost{
    constructor(userId){
        this.userId = userId;
        this.fetchUser();
    }

    fetchUser(){
        userService
            .getUser(this.userId)
            .then(() => this.fetchPost())
    }

    fetchPost(){
        postService
            .getLastPost(this.userId,)
            .then(this.newPost())
    }

    newPost(){
        new serverPost(JSON.parse(localStorage.getItem("post")), JSON.parse(localStorage.getItem("user")), 10, time()).createPost()
    }
}


let create = new FetchPost(2)
