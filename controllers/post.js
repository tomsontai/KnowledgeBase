let db = require('../models/postdb');
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
    let Replies = replydb.getReplies(idpost);
    Replies.then( ([result, filedData]) => {
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

exports.searchSubject = (req, res, next) => {
    let key = req.body.search;
    let SearchResult = db.searchBySubject(key);
    SearchResult.then( ([posts, fieldData]) => {
        if (posts.length == 0) {
            res.render('searchResult', {
                error: true,
                searchCSS: true
            });
        } else {
            res.render('searchResult', {
                posts: posts,
                searchCSS: true
            });
        }  
    });
}


exports.searchTopic = (req, res, next) => {
    let topic = req.body.topic;
    let Search = db.searchByTopic(topic);
    Search.then( ([posts, fieldData]) => {
        if (posts.length == 0) {
            res.render('searchResult', {
                error: true,
                searchCSS: true
            });
        } else {
            res.render('searchResult', {
                posts: posts,
                searchCSS: true
            });
        } 
    });
}