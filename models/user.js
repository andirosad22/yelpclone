const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('password-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique : true,
  }
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('User', userSchema);
module.exports = user;