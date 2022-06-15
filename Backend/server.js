const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get('/', (req, res)=>{
    res.send('jello')
})

app.listen(5000);