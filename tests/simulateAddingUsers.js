const faker = require('faker');
const axios = require('axios');

/*
userId
age
gender
lastName
firstName
email
username
profilePicture
followers: [ userIds ]
following: [ userIds ]
*/

const followGenerator = () => {
  // generate a random list of integers ranging from 0 - 10,000,000
  // there will be a random number of these generated, ranging from 0 - 4,000
  // these will represent either followers or followees
  const maxFollow = 10000000;
  const maxNum = 400;
  let num = Math.round(Math.random() * maxNum);
  let friends = [];
  let newFriend;

  for (let i = 0; i < num; i++) {
    newFriend = Math.round(Math.random() * maxFollow);
    if (!friends.includes(newFriend)) {
      friends.push(newFriend);
    }
  }
  return friends;
};

let user = {};
let gender;
let age;
let followers = [];
let followees = [];

for (let i = 0; i < 1000; i++) {
  user = {
    age: Math.floor(Math.random() * 70) + 18,
    gender: Math.random() > 0.5 ? 'M' : 'F',
    lastName: faker.fake('{{name.lastName}}'),
    firstName: faker.fake('{{name.firstName}}'),
    email: faker.fake('{{internet.email}}'),
    username: faker.fake('{{internet.userName}}'),
    profilePicture: faker.fake('{{image.imageUrl}}'),
    followers: followGenerator(),
    followees: followGenerator(),
  };
  axios.put('http://localhost:8080/user/add', user)
    .catch((error) => {
      console.log(error);
    });
}
