//const uuid = require('uuid/v4');

const apitest = (req, res, next) => {
    console.log("test success");
    res.json({message: "a test json response"});
};

const DUMMY_USERS = [
    {
        id: 'u1@mail.com',
        password: 'not_secure_yet'
    }
];

const signup = (req, res, next) => {
    const{ email, password }  = req.body;
    
    const new_user = {
        email, // shorthand for email: email
        password
    };

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists.', 422);
    }

    DUMMY_USERS.push(new_user);
    res.status(201).json({user: new_user});
};

exports.apitest = apitest;
exports.signup = signup;