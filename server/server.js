const express = require('express');
const app = express();
let users = require("./data/users.json");
let posts = require("./data/posts.json");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// get all users
app.get('/users', (req, res) => res.json(users))
// get user by userId
app.get('/users/:userId', (req, res) =>{
    const user = users.find(user => user.userId == req.params.userId);
    res.json(user);
})
//get all posts
app.get('/posts', (req, res) => res.json(pots))
//get all posts by userId
app.get('/posts/:userId', (req, res) =>{
    let userComments = [];
    posts.forEach(elm =>{
        if(elm.userId == req.params.userId){
            userComments.push(elm)
        }
    });
    res.json(userComments);
})
//get post by userId and postId
app.get('/posts/:userId/:postId', (req, res) =>{
    let userPost = "";
    posts.forEach(elm =>{
        if((elm.userId == req.params.userId) && (elm.postId == req.params.postId)){
            userPost = elm;
        }
    });
    res.json(userPost);
})
app.listen("3000")