const mongoose = require('mongoose');

// can pass in a javascript object into the method
const userSchema = new mongoose.Schema({
    // another javascript object to prevent hardcoding
    email: {type:String, required: true},
    password: {type:String, required: true}
});

// first argument specifies the name that will be converted to COLLECTION NAME by making it plural
// second argument is the schema definition
module.exports = mongoose.model('User', userSchema);