const db = require('./db-connect');
const CommentsService = {};
module.exports = CommentsService;

CommentsService.getCommentsByShowId = (id) =>{
    const sql =`
        SELECT * FROM comments
        WHERE show_id = $[id];
    `
    return db.any(sql, {id});
}

CommentsService.createNewComment = ({comment_body, user_id, show_id}) =>{
    const sql = `
        INSERT INTO comments
        (comment_body, user_id, show_id)
        VALUES
        ($[comment_body], $[user_id], $[show_id])
        RETURNING *;
    `
    return db.one(sql, {comment_body, user_id, show_id});
}