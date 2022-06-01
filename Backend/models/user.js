const mongoose = require('mongoose');

// can pass in a javascript object into the method
const userSchema = new mongoose.Schema({
    // another javascript object to prevent hardcoding
    email: {type:String, required: true},
    password: {type:String, required: true}
});

// first argument specifies the name that will be converted to COLLECTION NAME by making it plural
// if the collection does not already exist
// second argument is the schema ie the template definition for this mongoose model
module.exports = mongoose.model('User', userSchema);