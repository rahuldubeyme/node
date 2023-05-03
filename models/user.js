const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const UserSchema = mongoose.Schema({
    userName : {
        type : String,
        default : ''
    },
    firstName : {
        type : String,
        default : ''
    },
    lastName : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String
    },
    avatar : {
        type : String
    },
    mobile : {
        type : String
    },
    countryCode : {
        type : String
    },
    formattedNumber : {
        type : String
    },
    isMobileVarify : {
        type : Boolean,
        default : false
    },
    isEmailVarify : {
      type : Boolean,
      default : false
    },
    roleId  : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isActive  : {
        type : Boolean,
        default : false
    },
    isSuspended : {
        type : Boolean,
        default : false
    },
    createdAt   : {
        type : Date
    },
    updatedAt  : {
        type : Date
    },  
}, {
    timestamps: true
});

UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

  UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

module.exports = mongoose.model('Users', UserSchema);