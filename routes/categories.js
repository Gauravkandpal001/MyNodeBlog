var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db=require('monk')(process.env.MONGODB_URI ||'localhost/nodeblog');

router.get('/show/:category',(req,res,next)=>{
    var db=req.db;
    var posts = db.get('posts');
    posts.find({category:req.params.category},{},(err,posts)=>{
        res.render('index',{
            "title":req.params.category,
            "posts":posts
        });
    });
});

router.get('/add', function(req, res, next) {
  res.render('addcategory',{
      "title":"Add Category"
  });
});

router.post('/add',(req,res,next)=>{
    //get the form values
    var title       = req.body.title;

     //check errors
     var errors = req.validationErrors();

     if(errors){
         res.render('addpost',{
             "errors":errors,
             "title" :title,
         });
     } else {
         var categories=db.get('categories');

         //submit to DB
         categories.insert({
             "title" :title,
         },(err,category)=>{
             if(err){
                 res.send('There was an issue submitting the category');
             } else {
                 req.flash('success','Category Submitted');
                 res.location('/')
                 res.redirect('/')
             }
         });
     }
});

module.exports = router;
