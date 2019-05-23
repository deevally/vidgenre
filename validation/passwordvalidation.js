const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");


const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
};


function validatePs(password){
  const schema= {
  password: new PasswordComplexity(complexityOptions)
  }
  return Joi.validate(password, schema);

}

exports.validatep = validatePs;