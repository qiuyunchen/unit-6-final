const CommentsService = require('../services/comments');
const express = require('express');
const app = express.Router();
module.exports = app;

// Post new comment route
app.post('/', (req, res) =>{
    const {comment_body, user_id, show_id} = req.body;

    CommentsService.createNewComment({comment_body, user_id: parseInt(user_id), show_id: parseInt(show_id)})
        .then(newComment =>{
            res.json({commentCreated: newComment});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get comment by id route
app.get('/:id', (req, res) =>{
    const {id} = req.params;
    CommentsService.getCommentById(id)
        .then(comment =>{
            res.json({comment});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get comments by show id route
app.get('/show/:id', (req, res) =>{
    const {id} = req.params;
    CommentsService.getCommentsByShowId(id)
        .then(comments =>{
            res.json({comments});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})