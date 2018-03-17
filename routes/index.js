var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db=require('monk')(process.env.MONGODB_URI ||'localhost:27017/nodeblog');

//Homepage blog posts
router.get('/', function(req, res, next) {
  var db=req.db;
  var posts =db.get('posts');
  posts.find({},{},(err,posts)=>{
      res.render('index',{
          "posts":posts
      });
  });
});

module.exports = router;
