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
        firstName: "Blabla",
        lastName: "Vlavla",
        profile: "https://randomuser.me/api/portraits/men/23.jpg",
        message: "Blabla",
        likes: 2,
        time: "20:00" 
      },
      {
        firstName: "Blabla",
        lastName: "Vlavla",
        profile: "https://randomuser.me/api/portraits/men/23.jpg",
        message: "Blabla",
        likes: 2,
        time: "20:00" 
      },
    ]
  };

  res.end(JSON.stringify(usersPosts));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');