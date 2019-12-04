let db = require('../models/userdb');
let messagedb = require('../models/messagedb');
let postdb = require('../models/postdb');

exports.startConversation = (req, res) => {

    let datetime = new Date();
    let id = req.body.recipientId;

    console.log(id);
    let conversation = {
        idsender:       req.session.user.id,
        idrecipient:    id,
        subject:        req.body.subject,
        // message:        req.body.details,
        date:           datetime
    };

    let newConvo = messagedb.startConversation(conversation);
    
    newConvo.then(([result, filedData]) => {
        console.log(result.insertId);

        let message = {
            content:            req.body.details,
            idsender:           id,
            idconversation:     result.insertId,
            time:               datetime
        }
    
        let newMsg = messagedb.createMessage(message);
        newMsg.then(([result, filedData]) => {
            console.log(result[0]);
        })
    });

    

    let Profile = db.getUser(id);
    Profile.then ( ([data, fieldData])  => {
        if (data.length == 0) {
            //todo, ajust the position and style of the error message
            let errorMessage = "User not exists";
            res.redirect("/home");
        } else {
            let user = data[0];
            let UserPosts = postdb.getPostByUser(id);
            UserPosts.then( ([posts, filedData]) => {
                console.log(posts);
                res.render('profile', {
                    user: user,
                    posts: posts,
                    homeCSS: true
                });
            });
        }
    });
    // res.render('profile:' + id);
    // db.getUser(req.body.senderId).then(data => {
    //     messagedb.createConversation(conversation, message);
    //     console.log(data);
    // })

}