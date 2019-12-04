let db = require('../util/database');

function startConversation(conversation) {
    return db.query('INSERT INTO conversation SET ? ', [conversation]);
}

function getConversations(userId) {
    
    return db.execute(`SELECT p.*, user.fname, user.lname, user.image FROM
        (
            SELECT DISTINCT if(idsender=1, idrecipient, idsender) AS id, idconversation, subject, date
            FROM conversation
            WHERE (idsender = ? OR idrecipient = ?)
        ) as p left join user on p.id = user.id`, [userId, userId]);
}

function createMessage(message) {
    return db.query('INSERT INTO message SET ?', [message]);
}

function getConversationMessages(conversationId) {
    let sql =
    `
        SELECT content 
        FROM message m
        WHERE m.idconversation = "${conversationId}"
        ORDER BY date;
    `
    return db.execute(sql);
}



 module.exports = {
    startConversation:      startConversation,
    createMessage:          createMessage,
    getConversations:       getConversations
 };