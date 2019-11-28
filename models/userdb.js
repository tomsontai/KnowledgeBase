let db = require('../util/database');

function getAllUser() {
    return db.execute("select * from user");
}

function getUser(id) {
    return db.execute('SELECT * FROM user WHERE id = ?', [id]);
}

function auth(email, password) {
    return db.execute('SELECT * FROM user WHERE email = ? AND password = ? ', [email, password]);
}

function registerUser(user) {
    return db.query('INSERT INTO user SET ?', [user]);
}

module.exports = {
    // testConnection : testConnection,
    getUser: getUser,
    getAllUser: getAllUser,
    auth: auth,
    register: registerUser
}


//testConnection();