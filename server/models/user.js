const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true,
    minlength : 1,
    trim : true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      nessage: '{VALUE} is not a valid email '
    }
  },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require:true
      }
    }]
});
// overriding toJSON method
//https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/1930840
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  //the following statement could not work in different versions of mongoose
  //user.tokens.push({access, token});
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e){
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

 UserSchema.pre('save', function(next) {
   var user = this;
   if (user.isModified('password')) {
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        return next();
       });
     });
   } else {
     return next();
   }

 });

var User = mongoose.model('User',UserSchema);

module.exports = {User};
