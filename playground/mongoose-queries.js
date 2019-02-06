const {ObjectID} = request('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5c5b26634469d09d2b0732f1';
if(!ObjectID.isValid(id)){
  console.log('id not valid');

}

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('id not found');
  }
  console.log('todo by id', todo);
}).catch(e) => console.log(e);
