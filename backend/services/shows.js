const db = require('./db-connect');
const ShowsService = {};
module.exports = ShowsService;

ShowsService.getAllShows = () =>{
    const sql = `
        SELECT shows.*, users.username
        FROM shows
        JOIN users
        ON shows.user_id = users.id;
    `
    return db.any(sql);
}

ShowsService.getAllUniqueShowTitles = () =>{
    const sql = `
        SELECT title  
        FROM shows
        GROUP BY title;
    `
    return db.any(sql);
}

ShowsService.getShowsByTitle = (title) =>{
    const sql = `
        SELECT shows.*, users.username
        FROM shows
        JOIN users
        ON shows.user_id = users.id
        WHERE shows.title = $[title];
    `
    return db.any(sql, {title});
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
        SELECT shows.*, genres.genre_name
        FROM
            (SELECT shows.*, users.username
            FROM shows
            JOIN users
            ON shows.user_id = users.id
            WHERE shows.id = $[id]) AS shows
        JOIN genres
        ON shows.genre_id = genres.id;
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