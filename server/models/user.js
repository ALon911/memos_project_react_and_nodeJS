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
memosBank: {
  memos: [
    {
      memoId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ]
}
});
userSchema.methods.removeMemo = function(memoId) {
  const updatedMemoItems = this.memosBank.memos.filter(item => {
    return item.memoId.toString() != memoId;
  });
  this.memosBank.memos = updatedMemoItems;
  return this.save();
};

userSchema.methods.addMemo = function(memoId) {
  const updatedMemos = [...this.memosBank.memos];
  updatedMemos.push(
    {memoId: memoId}
  );

    this.memosBank.memos = updatedMemos;
  return this.save();

}

const User = mongoose.model('User', userSchema);
module.exports = User;