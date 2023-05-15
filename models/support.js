const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const SupportSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  message: {
    type: String
  },
  isSuspended: {
    type: Boolean,
    default : false
  },
  isDeleted: {
    type: Boolean,
    default : false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Support', SupportSchema);
