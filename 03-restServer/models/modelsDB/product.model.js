const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    stock: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    img:{
        type: String,
        default: ''
    },
    state: {
        type: Boolean,
        default: false 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

productSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
};

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;

