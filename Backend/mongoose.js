const mongoose = require('mongoose');
const User = require('./models/user'); // dont forget the . in ./mod.....

// mongoose auto opens and closes the connection. specify the particular db after the .net/
// .connect() returns a promise which will get evaluated eventually- as either a success or failure
// therefore we can add a .then() and .catch() respectively
mongoose.connect('mongodb+srv://indraneel:user_pass@cluster0.kbdd5.mongodb.net/OpenBill1?retryWrites=true&w=majority').then(() => {
    console.log('connected to db');
}).catch( () => {
    console.log("failed to connect");
});

// DATABASE CRUD FUNCTIONS
const createUser = async (req, res, next) => {
  // instantiate the model, pass in the specific values
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  const result = await newUser.save();
  res.json(result);
};

exports.createUser = createUser;