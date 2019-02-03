//const MongoCliente = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

 db.collection('Users').findOneAndUpdate({
   _id: new ObjectID('5c5711678e7fcf19d9f0c561')
 }, {
   $set: {
     completed: true
   }
 }, {
   returnOriginal: false
 }).then((res) => {
   console.log(res);
 });

  client.close();
});
