const { stringify } = require('nodemon/lib/utils');
const Memo = require('../models/memo');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
    editUser
}