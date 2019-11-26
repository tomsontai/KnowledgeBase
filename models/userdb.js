let db = require('../util/database');



//testing connection
function testConnection() {
    let sql = "select * from user";
    db.execute(sql)
        .then((data) => console.log(data))
        .catch((error) => console.log(error)); 
}

function getAllUser() {
    return db.execute("select * from user");
}

function getUser() {
    return db.execute('SELECT * FROM user WHERE id = ?', [1]);
}

function auth(email, password) {
    return db.execute('SELECT * FROM user WHERE email = ? AND password = ? ', [email, password])
}

module.exports = {
    // testConnection : testConnection,
    getUser: getUser,
    getAllUser: getAllUser,
    auth: auth
}


//testConnection();