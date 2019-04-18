const db = require('./db-connect');
const GenreService = {};
module.exports = GenreService;

GenreService.getAllGenres = () =>{
    return db.any('SELECT * FROM genres;');
}