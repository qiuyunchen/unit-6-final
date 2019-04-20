const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Service Module Requirements
const UserService = require('./services/user');
const ShowsService = require('./services/shows');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// test connection
app.get('/', (req, res) =>{
    res.json({success: 'connected', url: 'localhost:5555/'});
})

// User routes
app.get('/users/all', (req,res) =>{
    UserService.getAllUsers()
        .then(usersArr =>{
            res.json({users: usersArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

app.get('/shows/user/:id', (req, res) =>{
    const {id} = req.params;
    ShowsService.getShowsByUserId( parseInt(id) )
        .then(showsArr =>{
            res.json({shows: showsArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

app.listen(5555, ()=>{
    console.log('Server listening to port 5555');
})
