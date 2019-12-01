let db = require('../models/postdb');
let userdb = require('../models/userdb');

exports.write = (req, res, next) => {
    const post = {
        iduser : req.session.user.id,
        subject : req.body.subject,
        content : req.body.content,
        topic : req.body.topic
    }

    let WritePost = db.writePost(post);
    WritePost.then(result => {
        console.log(result);
        res.redirect('/home');
        console.log(req.session);
    });
}


exports.getLatestFive = (req, res, next) => {
    let PostList = db.getRecentPosts();
    
}
