let db = require('../util/database');

function getReplies(idpost) {
    return db.execute('SELECT message, image, user.id FROM reply, user WHERE idpost = ? AND user.id = reply.iduser', [idpost]);
}

function addReply(reply) {
    return db.query(`INSERT INTO reply SET ? `, [reply]);
}


module.exports = {
    getReplies  : getReplies,
    addReply    : addReply
}