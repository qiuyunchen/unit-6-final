const ShowsService = require('../services/shows');
const express = require('express');
const app = express.Router();
module.exports = app;

// Post new show route
app.post('/', (req, res) =>{
    const {title, img_url, user_id, genre_id} = req.body;

    ShowsService.createNewShow({title, img_url, user_id: parseInt(user_id), genre_id: parseInt(genre_id)})
        .then(newShow =>{
            res.json({showCreated: newShow});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get show by id route
app.get('/:id', (req, res) =>{
    const {id} = req.params;
    ShowsService.getShowById(id)
        .then(show =>{
            res.json({show});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get shows by user id route
app.get('/user/:id', (req, res) =>{
    const {id} = req.params;
    ShowsService.getShowsByUserId( parseInt(id) )
        .then(showsArr =>{
            res.json({shows: showsArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get shows by title route
app.get('/title/:title', (req, res) =>{
    const {title} = req.params;
    ShowsService.getShowsByTitle(title)
        .then(watchersArr =>{
            res.json({watchers: watchersArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get unique shows route
app.get('/unique', (req, res) =>{
    ShowsService.getAllUniqueShowTitles()
        .then(arr =>{
            res.json({uniqueShows: arr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})