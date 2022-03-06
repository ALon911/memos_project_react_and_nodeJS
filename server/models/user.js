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
memos: [
  {
      memoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Memo',
        required: true
      }
    
  }
]
});
userSchema.methods.removeMemo = async function(memoIds) {

  await memoIds.map(memoId => {
    
    const updatedMemoItems =  this.memos.filter(item => {
      return item.memoId.toString() != memoId;
    });
    this.memos = updatedMemoItems;
    

  });

  return this.save();
};

userSchema.methods.addMemo = function(memoId) {

  const updatedMemos = [...this.memos];

  updatedMemos.push(
    {memoId: memoId}
  );

    this.memos = updatedMemos;

    return this.save();

}

const User = mongoose.model('User', userSchema);
module.exports = User;