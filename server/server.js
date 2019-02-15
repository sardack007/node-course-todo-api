require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/todos',authenticate , (req, res) => {
  // console.log(`we got ${req.body}`);

  //check if exist the property
  if(typeof req.body.text ==='undefined') req.body.text = '';
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    // console.log(`this is the doc ${doc}`);
    res.send(doc);
  }, (err) => {
    // console.log(`this is an error ${err}`);
    res.status(400).send(err);

  });
});

app.get('/todos',authenticate ,(req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',authenticate ,(req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
        return res.status(404).send();
    }

    res.send({todo});
  })
  .catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate,(req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(todo){
        return res.status(200).send({todo});
    }
    res.status(404).send();

  })
  .catch((err) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  },{$set: body},{new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// var authenticate = (req, res ,next) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user){
//       return Promise.reject();
//     }
//     req.user = user;
//     req.token =token;
//     next();
//   }).catch((e) => {
//     res.status(401).send();
//   });
// };

app.get('/users/me',authenticate, (req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth');
  // User.findByToken(token).then((user) => {
  //   if (!user){
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });

});

// POST /users/login  {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email','password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });

});

app.delete('/users/me/token',authenticate ,(req, res) =>{
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
