const mongoose = require('mongoose');

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

module.exports = mongoose.model('Users', UserSchema);