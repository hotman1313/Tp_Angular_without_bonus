const express = require('express');
const fs = require('fs');
const app = express();

//
var data_posts = fs.readFileSync("./data/posts.json");
var jsonContent = JSON.parse(data_posts);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/posts', function (req, res) {
    res.send(jsonContent);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
