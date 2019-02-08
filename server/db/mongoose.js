var mongoose = require('mongoose');
//It is not necessary to put the following statement, because mongoose works with
//the native Promise, but you can add your own librrary like blouebird if your wish
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected');
})

module.exports = {mongoose};
