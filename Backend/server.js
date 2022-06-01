const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(userRoutes);

app.listen(5000);