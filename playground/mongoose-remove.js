const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(result);
// });

//Todo.finOneAndRemove
//Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: '5c5b63fdd045b91530a8265a'}).then((todo) => {
//   console.log(todo);
// });
//
// Todo.findByIdAndRemove('5c5b63fdd045b91530a8265a').then((todo) => {
//   console.log(todo);
// });
