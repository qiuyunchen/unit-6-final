const UserService = require('../services/user');
const express = require('express');
const app = express.Router();
module.exports = app;

// Get all users
app.get('/all', (req,res) =>{
    UserService.getAllUsers()
        .then(usersArr =>{
            res.json({users: usersArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get user by id
app.get('/:id', (req, res) =>{
    const {id} = req.params;
    UserService.getUserById(id)
        .then(user =>{
            res.json({user});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})