const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title : {
        type : String,
        default : ''
    },
    type : {
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


module.exports = mongoose.model('Category', CategorySchema);