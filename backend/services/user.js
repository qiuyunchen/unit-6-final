const db = require('./db-connect');
const UserService = {};
module.exports = UserService;

UserService.getAllUsers = () =>{
    return db.any('SELECT * FROM users');
}

UserService.getUserById = (id) =>{
    const sql = `
        SELECT * FROM users
        WHERE id = $[id];
    `
    return db.one(sql, {id});
}

UserService.getUserByNameCaseSensitive = (username) =>{
    const sql = `
        SELECT * FROM users
        WHERE username = $[username];
    `
    return db.one(sql, {username});
}

UserService.createUser = (username) =>{
    const sql = `
        INSERT INTO users 
        (username)
        VALUES
        ($[username])
        RETURNING *;
    `
    return db.one(sql, {username});
}

