const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Service Module Requirements
const UserService = require('./services/user');
const ShowsService = require('./services/shows');
const GenreService = require('./services/genre');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// test connection
app.get('/', (req, res) =>{
    res.json({success: 'connected', url: 'localhost:5555/'});
})

// Get All Users Route
app.get('/users/all', (req,res) =>{
    UserService.getAllUsers()
        .then(usersArr =>{
            res.json({users: usersArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Shows For One User Route
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

// Get Unique Shows Route
app.get('/shows/unique', (req, res) =>{
    ShowsService.getAllUniqueShowTitles()
        .then(arr =>{
            res.json({uniqueShows: arr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get Shows By Title Route
app.get('/shows/title/:title', (req, res) =>{
    const {title} = req.params;
    ShowsService.getShowsByTitle(title)
        .then(watchersArr =>{
            res.json({watchers: watchersArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get all genres Route
app.get('/genres/all', (req, res) =>{
    GenreService.getAllGenres()
        .then(genresArr =>{
            res.json({genres: genresArr});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Post new show route
app.post('/shows', (req, res) =>{
    const {title, img_url, user_id, genre_id} = req.body;

    ShowsService.createNewShow({title, img_url, user_id: parseInt(user_id), genre_id: parseInt(genre_id)})
        .then(newShow =>{
            res.json({showCreated: newShow});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

// Get genre by id route
app.get('/genre/:id', (req, res) =>{
    const {id} = req.params;
    GenreService.getGenreById(id)
        .then(genre =>{
            res.json({genre});
        })
        .catch( err =>{
            res.status(404).json({Error: err});
        })
})

app.listen(5555, ()=>{
    console.log('Server listening to port 5555');
})
