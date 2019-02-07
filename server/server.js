var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(`we got ${req.body}`);

  //check if exist the property
  if(typeof req.body.text ==='undefined') req.body.text = '';
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    // console.log(`this is the doc ${doc}`);
    res.send(doc);
  }, (err) => {
    // console.log(`this is an error ${err}`);
    res.status(400).send(err);

  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo){
        return res.status(404).send();
    }

    res.send({todo});
  })
  .catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id',(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOneAndRemove(id).then((doc) => {
    if(doc){
        return res.status(200).send(doc);
    }
    res.status(404).send();

  })
  .catch((err) => {
    res.status(400).send();
  });

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
