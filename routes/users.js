const { validate, User } = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const { name, email, password } = req.body;

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).json({ message: "User already exists" });
// const userObj = {
//   name,
//   email,
//   password
// }
  if (!user) {
     user = new User(_.pick(req.body, ['name','email', 'password']));

//     const salt  = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(user.password, salt);

user.password = await bcrypt.hashSync(user.password, 10);
await user.save();

const token = user.generateAuthToken();


    // res.send(_.pick(user,['_id','name','email']));

 res.header('x-auth-token',token).send(_.pick(user, ["_id", "name", "email"]));
 
   }

  // if(!user){

  //   const createUser =  await User.create(userObj);

  //   return res.status(201).json({message:"User created succesfully",
  //   statusCode: 201,
  //   createUser});
  // }
});

//getting the current User
router.get('/me', auth, async (req, res)=> {
const user = await User.findById(req.currentUser._id).select('-password');

res.send(user);
});
module.exports = router;