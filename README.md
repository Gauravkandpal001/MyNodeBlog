 Node Blog System

001 Modules, Middleware  Template Part A

    $ express nodeblog
    $ cd nodeblog/
    $ npm install --save mongodb
    $ npm install --save monk
    $ npm install --save connect-flash
    $ npm install --save express-validator
    $ npm install --save express-session
    $ npm install --save express-messages
    $ npm install --save multer@0.1.8
    $ npm install --save moment
    $ npm install

    $ mkdir public/images/uploads

    $ mongo
    > use nodeblog

    > db.createCollection('posts');
    > db.createCollection('categories');

    $ npm start


002 Modules, Middleware Template Part B

003 Homepage Blog Posts Part A

    $ mongo
    > use nodeblog

    > db.posts.insert({title:"Blog Post One", category: "Technology", author:"Brad Traversy", body:"This is the body", date: ISODate()})
    > db.posts.insert({title:"Blog Post Two", category: "Fasion", author:"John Doe", body:"This is the body for a fasion post", date: ISODate()})

    > db.posts.find().pretty()

    $ npm start

004 Homepage Blog Posts Part B

    $ npm start

005 Adding Posts PART -A

006 Adding Posts PART -B

    $ mongo
    > use nodeblog

    > db.categories.insert({title:"Technology"})
    > db.categories.insert({title:"Fasion"})

<br/>

Web Text Editor - http://ckeditor.com/ (Version 4.5.3)

    $ npm start

007 Adding Categories

    $ npm start

008 View Posts By Category

    $ mongo
    > use nodeblog
    > db.posts.remove({})


http://lipsum.com/

    $ npm start


009 Single Posts Comments Part A

    $ npm start

010 Single Posts Comments Part B

    $ npm start


<br/>
