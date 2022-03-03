const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  userType: {
    type: String,
    default: 'user',
    enum : {
      values: ['user','admin'],
      message: '{VALUE} is not a good permission'
    }
  
    
},
});


const User = mongoose.model('User', userSchema);
module.exports = User;