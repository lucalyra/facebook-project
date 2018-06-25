const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  let usersPosts = {
    posts: [
      {
        firstName: "SomeGuy",
        lastName: "1",
        profile: "https://randomuser.me/api/portraits/men/23.jpg",
        message: "Per ei case tota doming, tantas corpora delicata te has? Ex eos integre torquatos, alii tollit ullamcorper his ad eu.",
        likes: 10,
        time: "10:43" 
      },
      {
        firstName: "SomeGuy",
        lastName: "2",
        profile: "https://randomuser.me/api/portraits/men/22.jpg",
        message: "Lorem ipsum dolor sit amet, pro dolorem adipiscing id, te his quas melius offendit. Illum quando euripidis et vim, te.",
        likes: 0,
        time: "21:03" 
      },
      {
        firstName: "SomeGuy",
        lastName: "3",
        profile: "https://randomuser.me/api/portraits/men/21.jpg",
        message: "Tollit scripta sapientem eam ex, dico labitur repudiare ei nec, pro harum comprehensam te? Sea te populo feugiat, ea labores.",
        likes: 13,
        time: "00:01" 
      }
    ]
  };

  res.end(JSON.stringify(usersPosts));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');