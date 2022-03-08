const { stringify } = require('nodemon/lib/utils');
const Memo = require('../models/memo');
const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


clientURL = 'localhost:3000';


const getUsers = async (req, res) => {
  result = await User.find({});
  console.log('alon data', result);
  res.status(200).send(JSON.stringify({result}));

}


const deleteUser = async (req, res) => {
  console.log(res);

  result = await User.deleteOne({_id: req.body.targetUser});
  if (result){
  res.status(200).send(JSON.stringify({message: 'success! oh yeah!! deleted.'}));
  }else{
    res.status(500).send(JSON.stringify({message: 'problem with delete!'}));
  }
}

const toggleUser = (req, res) =>
{
    

    User.findOne({_id: req.body._id})
    .then(user => {
        console.log(user);
      if (user.userType == 'user'){
        user.userType = 'admin';
      }
      else{
        user.userType = 'user';
      }
      user.save(err => console.log(err));
      res.send('user toggled successfully');
  });


}
const editUser = (req, res) =>
{
    

    User.findOne({_id: req.body._id})
    .then(user => {
        console.log(user);
      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.email = req.body.email;
      user.save(err => console.log(err));
      res.send('user edited successfully');
  });


}

const hello_world = async (req, res) => {

  
    Memo.find({writtenBy: req.user.user_id}).sort({ createdAt: -1 })
    .then(result => {
        result = result.map( val => {
            console.log(val.createdAt);
            var d = new Date(val.createdAt);
            realTime = d.toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem',hour12: false });

            return {
                _id: val._id,
                description: val.description,
                deleted: val.deleted,
                createdAt: realTime,
                updatedAt: realTime

        };
        })
      res.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
}
  
const  postHello = async (req, res) =>
{
  if (req.body.description != ''){
  var memoId;
    console.log(req.body.smart);
    var memo = new Memo({
        ...req.body,
        deleted: req.body.deleted,
        writtenBy: req.user.user_id
    });



    
    memo.save(function(err, memoItem) {
        if (err) console.log(err);
        else{
            memoId = memoItem._id;
    
        
        }
        

    });
    
  
    var user1 = await User.findOne({ _id: req.user.user_id });
     user1.addMemo(memoId);
   

    res.json({_id: memoId});
  }else{
    res.json('empty description');
  }
}
const editMemo = (req, res) =>
{
    

    console.log(req.body);
    console.log(req.body);
    console.log(req.body);
    console.log(req.body);

    Memo.findOne({_id: req.body._id})
    .then(memo => {
        console.log(memo);
      memo.deleted = req.body.deleted;
      memo.save(err => console.log(err));
      res.send('edited');
  });


}
const deleteMemos = async (req, res) =>
{
  
  console.log('very important alon !!! <<<<<< 2022 ', req.body._id);
  console.log(req.user.user_id);
    if ( req.body._id !=undefined){

    await Memo.deleteMany({ _id: req.body._id });
       
      var user1 = await User.findOne({ _id: req.user.user_id });

      user1.removeMemo( req.body._id);
   
      // console.log('alon check if success ? ',result);
      res.send('deleted');
    }
}

const register = async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        memos: []  
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        `${process.env.TOKEN_KEY}`,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }
  const login = async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          `${process.env.TOKEN_KEY}`,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).json({error: "Invalid Credentials"});
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }

  const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      return false;

    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return false;
    }else{
    let hash1 = await bcrypt.hash(password, 10);

    var user1 = await User.findOne({ _id: userId });
    user1.password = hash1;
    user1.save();
  await passwordResetToken.deleteOne();
  return true;
}

  };
  const requestPasswordResetController = async (req, res, next) => {
    


    const user = await User.findOne({ email: req.body.email });

    if (!user) throw new Error("User does not exist");
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);
  
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `${clientURL}/reset?token=${resetToken}&id=${user._id}`;
    console.log(process.env.GMAIL_PASS);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    var message = {
      from: process.env.GMAIL_USER,
      to: req.body.email,
      subject: "Alon's Reset System",
      text: "Plaintext version of the message",
      html: `<html>
      <head>
          <style>
          </style>
      </head>
      <body>
          <p>Hi ${user.first_name},</p>
          <p>You requested to reset your password.</p>
          <p> Please, click the link below to reset your password</p>
          <a href="http://${link}">Reset Password</a>
      </body>
  </html>`
    };
    var goodjob = await transporter.sendMail(message);
    console.log(goodjob.info);
    return res.status(200).send('good');
  };
  const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
      req.body.user_id,
      req.body.token,
      req.body.password
    );
    return res.json(resetPasswordService);
  };
module.exports = {
    hello_world,
    postHello,
    deleteMemos,
    editMemo,
    register,
    login,
    getUsers,
    deleteUser,
    toggleUser,
    editUser,
    resetPasswordController,
    requestPasswordResetController
}