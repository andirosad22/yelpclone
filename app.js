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

app.get('/seed/place', async(req, res) => {
  const place = new Place({
    title: 'Empire State Building',
    price: '$999',
    descriptionn: 'A great building',
    location: 'New York, NY'
  });
  await place.save();
  res.send(place);
})

app.listen(8080, () => {
  console.log(`server is running on http://127.0.0.1:8080`);
})