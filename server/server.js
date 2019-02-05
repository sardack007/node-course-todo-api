var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(`we got ${req.body}`)
  //check if exist the property
  if(typeof req.body.text ==='undefined') req.body.text = '';
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    console.log(`this is the doc ${doc}`)
    res.send(doc);
  }, (err) => {
    console.log(`this is an error ${err}`);
    res.status(400).send(err);

  });
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
