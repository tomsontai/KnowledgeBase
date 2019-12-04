let db = require('../util/database');

function startConversation(conversation) {
    // let sql =
    // `
    //     INSERT INTO conversation 
    //     VALUES (${conversation.senderId}, ${conversation.recipientId}, ${conversation.subject})
    // `
    
    // return db.query(sql);
    return db.query('INSERT INTO conversation SET ? ', [conversation]);
}

function getConversations(userId) {
    let sql =
    `
        SELECT *
        FROM conversation c
        WHERE c.idsender = ${userId} OR c.idrecipient = ${userId};
    `
    return db.execute(sql);
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
    createMessage:          createMessage
 };