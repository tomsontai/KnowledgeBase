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
    return db.execute('SELECT p.*, image from post AS p, user WHERE p.iduser = user.id ORDER BY idpost DESC LIMIT 5');
}

module.exports = {
    // testConnection : testConnection,
    getPost         :   getPost,
    getPostByUser   :   getPostByUser,
    writePost       :   writePost,
    getRecentPosts  :   getRecentPosts
}
