const express = require('express');
const app = express();
let users = require("./data/users.json");
let comments = require("./data/comments.json");


app.get('/users', (req, res) => res.send(users))

app.listen("3000")