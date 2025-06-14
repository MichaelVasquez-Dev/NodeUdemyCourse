const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, state, active, ...category } = this.toObject();
    return category;
}


module.exports = model('Category', CategorySchema);