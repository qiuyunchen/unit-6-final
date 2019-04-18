const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.json({success: 'connected', url: 'localhost:5555/'});
})

app.listen(5555, ()=>{
    console.log('Server listening to port 5555');
})
