const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Models
const Place = require('./models/place');

mongoose.connect('mongodb://127.0.0.1/bestpoints')
.then((result)=>{
    console.log('connected to mongoose');
}).catch((err)=>{
    console.log(err);
});

// iniciete ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/place', async(req, res) => {
  const places = await Place.find();
  res.render('places/index', {places});
});
app.get('/place/:id', async (req, res) => {
  // const {id} = req.params;
  const place = await Place.findById(req.params.id);
  res.render('places/show', {place});
})

app.listen(8080, () => {
  console.log(`server is running on http://127.0.0.1:8080`);
})