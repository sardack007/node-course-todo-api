//const MongoCliente = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

 //deleteMany
  // db.collection('Todos').deleteMany({
  //   text: 'Eat lunch'
  // }).then((result) => {
  //   console.log(result);
  // });
 //DeleteOne
  // db.collection('Todos').deleteOne({
  //   text: "lunch"
  // }).then((result) => {
  //   console.log(result);
  // });

 //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({
  //   completed: false
  // }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({
  //   name: 'jim'
  // });
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID("5c560ab6ffa75eeaa15f93a6")
  }).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  });

  client.close();
});
