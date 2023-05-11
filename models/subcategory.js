const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const SubCategorySchema = mongoose.Schema({
    categoryId: {
        type: ObjectId,
        ref: 'Category',
        required: true
      },
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


module.exports = mongoose.model('Subcategory', SubCategorySchema);