const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempMobileSchema = new Schema({
  isVarified: {
    type: Boolean,
    required: false
    },
  mobileNumber: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  validTillAt: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TempMobile', tempMobileSchema);
