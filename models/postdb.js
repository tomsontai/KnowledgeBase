let db = require('../util/database');

function getPost(postId) {
    return db.execute('SELECT * FROM post WHERE idpost = ?', [postId]);
}


function writePost(post) {
    return db.query('INSERT INTO post SET ? ', [post]);
}

function getPostByUser(iduser) {
    return db.execute(`SELECT p.*, image, count(reply.idreply) AS replies
                        From post AS p 
                        LEFT JOIN reply ON p.idpost = reply.idpost
                        LEFT JOIN user ON p.iduser = user.id 
                        WHERE p.iduser = ?
                        GROUP BY p.idpost`, [iduser]);
}

function getRecentPosts() {
    return db.execute(`SELECT p.*, image, count(reply.idreply) AS replies
                        From post AS p 
                        LEFT JOIN reply ON p.idpost = reply.idpost
                        LEFT JOIN user ON p.iduser = user.id 
                        GROUP BY p.idpost
                        ORDER BY idpost DESC LIMIT 5`);
}

function searchBySubject(key) {
    let pattern = '%' + key + '%';
    return db.execute(`SELECT p.*, image, count(reply.idreply) AS replies
                        From post AS p 
                        LEFT JOIN reply ON p.idpost = reply.idpost
                        LEFT JOIN user ON p.iduser = user.id 
                        WHERE p.subject LIKE ?
                        GROUP BY p.idpost`, [pattern]);
}

function searchByTopic(topic) {
    return db.execute(`SELECT p.*, image, count(reply.idreply) AS replies
                        From post AS p 
                        LEFT JOIN reply ON p.idpost = reply.idpost
                        LEFT JOIN user ON p.iduser = user.id 
                        WHERE p.topic LIKE ?
                        GROUP BY p.idpost`, [topic]);
}

module.exports = {
    // testConnection : testConnection,
    getPost         :   getPost,
    getPostByUser   :   getPostByUser,
    writePost       :   writePost,
    getRecentPosts  :   getRecentPosts,
    searchBySubject :   searchBySubject,
    searchByTopic   :   searchByTopic
}
