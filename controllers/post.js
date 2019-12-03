let db = require('../models/postdb');
let userdb = require('../models/userdb');
let replydb = require('../models/replydb');

exports.write = (req, res, next) => {
    const post = {
        iduser : req.session.user.id,
        subject : req.body.subject,
        content : req.body.content,
        topic : req.body.topic
    }

    let WritePost = db.writePost(post);
    WritePost.then(result => {
        res.redirect('/home');
    });
}

exports.getReplies = (req, res, next) => {
    let idpost = req.params.idpost;
    console.log(idpost);
    let Replies = replydb.getReplies(idpost);
    Replies.then( ([result, filedData]) => {
        console.log(result);
        res.send(result);
    });
}

exports.addReply = (req, res, next) => {
    const reply = {
        iduser : req.session.user.id,
        idpost : req.body.idpost,
        message: req.body.message
    }

    let Add = replydb.addReply(reply);
    Add.then(result => {
        res.send(result);
    });
    
    
}

