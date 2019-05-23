const { User } = require("../models/user");
const mongoose = require("mongoose");
const Joi = require('joi');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();




router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

 

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: "invalid email or password" });
  
  const validPassword = await bcrypt.compare(req.body.password, user.password)

if(!validPassword){
    return res.status(400).json({ message: "invalid email or password" });
}

const token = user.generateAuthToken();

return res.status(200).json({message:"successfully logged in",statusCode:200, user,token});
});


function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
