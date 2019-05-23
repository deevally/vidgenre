const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');
// const PasswordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));

  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {



  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;