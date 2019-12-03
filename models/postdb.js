let db = require('../util/database');


function getPostByUser(userId) {
    return db.execute('SELECT * FROM post WHERE iduser = ?', [userId]);
}

function getPost(postId) {
    return db.execute('SELECT * FROM post WHERE idpost = ?', [postId]);
}


function writePost(post) {
    return db.query('INSERT INTO post SET ? ', [post]);
}

function getRecentPosts() {
    return db.execute(`SELECT p.*, image, user.id AS iduser, count(reply.idreply) AS replies
                       From post AS p 
                       LEFT JOIN reply ON p.idpost = reply.idpost
                       LEFT JOIN user ON p.iduser = user.id 
                       GROUP BY p.idpost
                       ORDER BY idpost DESC LIMIT 5`);
}

module.exports = {
    // testConnection : testConnection,
    getPost         :   getPost,
    getPostByUser   :   getPostByUser,
    writePost       :   writePost,
    getRecentPosts  :   getRecentPosts
}
