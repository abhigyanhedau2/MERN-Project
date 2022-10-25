const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true    // Speeds up the query process and returns the result fast. Sets index.
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    image: {
        type: String,
        required: true
    },
    // Array of places
    places: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Place'
    }]
});

// To make sure email is unique always
userSchema.plugin(uniqueValidator);

const User = new mongoose.model('User', userSchema);

module.exports = User;