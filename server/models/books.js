/*
  file name: books.js
  author: simran
  student id: 300991457
  web app name: favourite book list : comp308-w2019-midterm-300991457
*/
let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);