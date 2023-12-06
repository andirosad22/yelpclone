const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  price: String,
  descriptionn: String,
  location: String,
  image: String,
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;