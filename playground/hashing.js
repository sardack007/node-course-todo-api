const {SHA256} = require('crypto-js');
var message = 'I am user numbre 3';
var hash = SHA256(message).toString();
console.log(message);
console.log('hash: ', hash);

var data ={
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data)).toString()
};
