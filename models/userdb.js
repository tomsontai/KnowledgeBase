let db = require('../util/database');

function getAllUser() {
    return db.execute("select * from user");
}

function getUser(id) {
    return db.execute(`select user.*, count(post.iduser) AS posts,
    (select count(*) from conversation where idsender= ? or idrecipient= ? ) as message
    from user, post where user.id = ? and post.iduser = user.id`, [id, id, id]);
}

function auth(email, password) {
    return db.execute('SELECT * FROM user WHERE email = ? AND password = ? ', [email, password]);
}

function registerUser(user) {
    return db.query('INSERT INTO user SET ?', [user]);
}

function emailCheck(email){
    return db.execute('SELECT * FROM user WHERE email = ? ', [email]);
}

function updateProfile(user) {
    console.log(user);
    return db.query('UPDATE user SET ? WHERE id= ?', [user, user.id]);
}

function getImage(id) {
    return db.execute('SELECT image FROM user where id = ? ', [id]);
}

function likeUser(id) {
    return db.execute(`UPDATE user SET likes = likes + 1 where id = ? `, [id]);
}
module.exports = {
    // testConnection : testConnection,
    getUser     : getUser,
    getAllUser  : getAllUser,
    auth        : auth,
    register    : registerUser,
    emailCheck  : emailCheck,
    update      : updateProfile, 
    getImage    : getImage,
    likeUser    : likeUser  
}


//testConnection();