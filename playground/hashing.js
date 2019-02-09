const {SHA256} = require('crypto-js');

const bcrypt = require('bcryptjs');

var password = 'abc123!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword ='$2a$10$WjzokXzIvXt7EP//jFGTe.mL2zti2zHkeL2Vpmc9TGVRj9Pvwkppq';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var message = 'I am user numbre 3';
// var hash = SHA256(message).toString();
// console.log(message);
// console.log('hash: ', hash);

// var data ={
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// };
