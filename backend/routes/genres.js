const GenreService = require('../services/genre');
const express = require('express');
const app = express.Router();
module.exports = app;

// Get all genres route
app.get('/all', (req, res) =>{
    GenreService.getAllGenres()
        .then(genresArr =>{
            res.json({genres: genresArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get genre by id route
app.get('/:id', (req, res) =>{
    const {id} = req.params;
    GenreService.getGenreById(id)
        .then(genre =>{
            res.json({genre});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})