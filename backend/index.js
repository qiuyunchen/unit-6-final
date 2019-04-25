const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Router Requirements
const commentsRouter = require('./routes/comments');
const genresRouter = require('./routes/genres');
const showsRouter = require('./routes/shows');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// test connection
app.get('/', (req, res) =>{
    res.json({success: 'connected', url: 'localhost:5555/'});
})

app.use('/comments', commentsRouter);
app.use('/genres', genresRouter);
app.use('/shows', showsRouter);
app.use('/users', usersRouter);

app.listen(5555, ()=>{
    console.log('Server listening to port 5555');
})
