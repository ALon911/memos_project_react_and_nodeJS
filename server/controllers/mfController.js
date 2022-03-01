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



const hello_world = async (req, res) => {
  var data1 = await Memo.find({writtenBy: req.user.user_id});
  console.log('relevant data');

  var currentUser1 = await User.find({writtenBy: req.user.user_id});

    console.log('data start!!!!')
    console.log(currentUser1);
    console.log('data end!!!!')
  
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
  var memoId;
    console.log(req.body.smart);
    memo = new Memo({
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

  

    var user_id = req.user.user_id;
await User.updateOne({_id: user_id},{$push: {
  memos: [ mongoose.Types.ObjectId(memoId)]
}});


    res.json({_id: memoId});
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
const deleteMemos = (req, res) =>
{
    if ( req.body._id !=undefined){
    Memo.deleteMany({ _id: req.body._id }, function (err) {
        if (err) {
            return handleError(err)};
            
      });
    }
      res.send('deleted');
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
    deleteUser
}