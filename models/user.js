const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name : {
        type : String,
        default : ''
    },
    last_name : {
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
    profile_pic : {
        type : String,
        default : ''
    },
    mobile_numbre : {
        type : String,
        default : ''
    },
    contact_number : {
        type : String,
        default : ''
    },
    role_id  : {
        type : String,
        default : ''
    },
    is_deleted : {
        type : String,
        default : ''
    },
    is_active  : {
        type : String,
        default : ''
    },
    created_at   : {
        type : String,
        default : ''
    },
    updated_at  : {
        type : String,
        default : ''
    },  
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);