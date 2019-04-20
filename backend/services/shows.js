const db = require('./db-connect');
const ShowsService = {};
module.exports = ShowsService;

ShowsService.getAllShows = () =>{
    return db.any('SELECT * FROM shows;');
}

ShowsService.getShowsByGenreId = (id) =>{
    const sql = `
        SELECT * FROM shows
        WHERE genre_id = $[id];
    `
    return db.any(sql, {id});
}

ShowsService.getShowsByUserId = (id) =>{
    const sql = `
        SELECT 
            shows.*, genres.genre_name
        FROM shows
        JOIN genres
        ON shows.genre_id = genres.id
        WHERE user_id = $[id];
    `
    return db.any(sql, {id});
}

ShowsService.getShowById = (id) =>{
    const sql = `
        SELECT * FROM shows
        WHERE id = $[id];
    `
    return db.one(sql, {id});
}

ShowsService.createNewShow = ({title, img_url, user_id, genre_id}) =>{
    const sql = `
        INSERT INTO shows
        (title, img_url, user_id, genre_id)
        VALUES
        ($[title], $[img_url], $[user_id], $[genre_id])
        RETURNING *;
    `
    return db.one(sql, {title, img_url, user_id, genre_id});
}