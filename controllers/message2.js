let db = require('../models/messagedb');


exports.startConversation = (req, res, next) => {
    let id = req.params.id;
    let Conversation = db.getConversations(id);
    Conversation.then ( ([conversations, fieldData]) => {
        req.session.conversations = conversations;
        console.log(conversations);
        res.render('conversations', {
            conversations: conversations,
            messageCSS: true
        });
    });
}

exports.showMessage = (req, res, next) => {
    if (req.session.user.id) {
        let idconv = req.params.id;
        let Conversation = db.getConversations(req.session.user.id);
        Conversation.then ( ([conversations, fieldData]) => {
            req.session.conversations = conversations;
            let Messages = db.getMessage(idconv);
                Messages.then( ([messages, fieldData]) => {
                    console.log(req.session.conversations);
                    res.render('conversations', {
                        conversations: conversations,
                        messages: messages,
                        messageCSS: true,
                        currentIdConv: idconv,
                        open: true
                });
            });
        });
    } else {
        res.redirect("/");
    }   
}

exports.addMessage = (req, res, next) => {
    let datetime = new Date();
    let message = {
        content: req.body.content,
        idsender: req.session.user.id,
        idconversation: req.body.idconversation,
        time: datetime
    }

    
    let newMsg = db.createMessage(message);
    newMsg.then(result => {
        res.redirect("/showMessages/" + req.body.idconversation);
    });

}

exports.addConversation = (req, res, next) => {
    let datetime = new Date();
    let id = req.body.recipientId;
    console.log(id);

    let conversation = {
        idsender: req.session.user.id,
        idrecipient:    id,
        subject:        req.body.subject,
        // message:        req.body.details,
        date:           datetime

    }

    let Conv = db.startConversation(conversation);
    Conv.then(result => {
        console.log(result.insertId);
        res.redirect("/showMessages/" + result.insertId);
    });

}