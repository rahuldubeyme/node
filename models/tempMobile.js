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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // The document will expire after 5 minutes (300 seconds)
  }
});

module.exports = mongoose.model('TempMobile', tempMobileSchema);
