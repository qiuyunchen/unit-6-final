const db = require('./db-connect');
const GenreService = {};
module.exports = GenreService;

GenreService.getAllGenres = () =>{
    return db.any('SELECT * FROM genres;');
}

GenreService.getGenreById = (id) =>{
    const sql = `
        SELECT * FROM genres WHERE id = $[id];
    `;
    return db.one(sql, {id});
}