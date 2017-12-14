const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.connect('mongodb://localhost/people-service');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('We\'re connected'));

const userSchema = mongoose.Schema({
  userId: Number,
  age: Number,
  gender: String,
  lastName: String,
  firstName: String,
  email: String,
  username: String,
  profilePicture: String,
  followers: Array,
  followees: Array,
});

const User = mongoose.model('User', userSchema);

const addUserToDbAsync = (user) => {
  return new Promise((resolve, reject) => {
    let newUser = new User(user);
    newUser.save((err, newUser) => {
      if (err) return reject(err);
      let successMessage = newUser.firstName.concat(' ', newUser.lastName, ' added to DB');
      return resolve(successMessage);
    });
  });
};

module.exports.addUserToDbAsync = addUserToDbAsync;
