const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const UserSchema = mongoose.Schema({
    firstname : {
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    password : {
        type : String,
        default : ''
    },
    profilepic : {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        default : ''
    },
    countrycode : {
        type : String,
        default : ''
    },
    roleid  : {
        type : String,
        default : ''
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isActive  : {
        type : Boolean,
        default : false
    },
    createdAt   : {
        type : Date,
        default : ''
    },
    updatedAt  : {
        type : Date,
        default : ''
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