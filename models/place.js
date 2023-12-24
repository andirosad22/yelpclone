const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const { string } = require('joi');

const placeSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  geometry:{
    type: {
      type: String,
      enum: ['Point'],
      require: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: [
    {
      url: String,
      filename: String
    }
  ],
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Review'
    }
  ]
});

placeSchema.post('findOneAndDelete', async function(doc){
  if(doc){
    await Review.deleteMany({_id: {$in: doc.reviews}});
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;