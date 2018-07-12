const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect("mongodb://alaing:lovebug1129@ds133746.mlab.com:33746/book-data", (err, client) => {
  if (err) return console.log(err)
  db = client.db('book-data')
  app.listen(process.env.PORT || 8000, () => {
    console.log('listening on 8000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('book-data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {books: result})
  })
})

app.get('/add', (req, res) => {

    res.render('add.ejs')
})

app.get('/category', (req, res) => {

    res.render('category.ejs')
})

app.get('/author', (req, res) => {
  db.collection('book-data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('author.ejs', {books: result})
  })
})

app.get('/title', (req, res) => {
  db.collection('book-data').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('title.ejs', {books: result})
  })
})

app.get('/author/:authors', (req, res) => {
  //res.send(req.params.id)
  db.collection('book-data').find({authors: req.params.authors}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('show.ejs', {books: result})
  })
});

app.get('/category/:catergories', (req, res) => {
  //res.send(req.params.id)
  db.collection('book-data').find({catergories: req.params.catergories}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('show.ejs', {books: result})
  })
});

app.post('/addBook', (req, res) => {
  db.collection('book-data').save({title: req.body.title, authors: req.body.authors, isbn: req.body.isbn, catergories: req.body.catergories}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/deleteBook', (req, res) => {
db.collection('book-data').findOneAndDelete({title: req.body.title}, (err, result) => {
  if (err) return res.send(500, err)
  res.send('Message deleted!')
})
})
