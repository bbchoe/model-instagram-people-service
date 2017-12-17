const faker = require('faker');
const fs = require('fs');

const { followGenerator } = require('./followGenerator');

const getBatchOfUsers = (popSize) => {
  const startTime = Date.now();

  // get last userId count
  let lastUserId = fs.readFileSync('./tests/lastUserId.txt', 'utf8');
  console.log('First user ID is ', lastUserId);
  const maxUserId = Number(lastUserId) + popSize;

  let newUsers = [];

  const generateNewUserAndPush = () => {
    const user = {
      userId: lastUserId,
      age: Math.floor(Math.random() * 70) + 18,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      lastName: faker.fake('{{name.lastName}}'),
      firstName: faker.fake('{{name.firstName}}'),
      email: faker.fake('{{internet.email}}'),
      userName: faker.fake('{{internet.userName}}'),
      profilePicture: faker.fake('{{image.imageUrl}}'),
      followers: followGenerator(),
      followees: followGenerator(),
    };

    newUsers.push(user);
  };

  while (lastUserId < maxUserId) {
    generateNewUserAndPush();
    lastUserId++;
  }
  console.log('finished with ', lastUserId);
  console.log(Date.now() - startTime, ' ms to complete operation');

  return newUsers;
};

module.exports.getBatchOfUsers = getBatchOfUsers;
