const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoSchema = new Schema({
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  description: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const Memo = mongoose.model('Memo', memoSchema);
module.exports = Memo;