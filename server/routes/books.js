/*
  file name: book.js
  author: simran
  student id: 300991457
  web app name: favourite book list : comp308-w2019-midterm-300991457
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: "Books",
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: "Add my book",
    books: ""
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let addNewBook = book({
    "Title":req.body.title,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre
  });

  book.create(addNewBook, (err, book) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let bookId=req.params.id;
  
  book.findById(bookId, (err, bookObject)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.render('books/details', {
        title:"Edit books",
        books:bookObject
      });
    }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

   let bookId = req.params.id;

   let updatedBook = book({
     "_id": bookId,
     "Title": req.body.title,
     "Price": req.body.price,
     "Author": req.body.author,
     "Genre": req.body.genre
   });

   book.update({_id: bookId}, updatedBook, (err)=>{
     if(err){
        console.log(err);
        res.end(err); 
     }else{
        res.redirect('/books');
     }
   });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let bookId = req.params.id;

  book.remove({_id: bookId}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect('/books');
    }
  });

});


module.exports = router;
