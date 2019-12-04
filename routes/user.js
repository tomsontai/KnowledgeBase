const express = require('express');
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const messageController = require('../controllers/message');
const messageController2 = require('../controllers/message2');

const router = express.Router();


router.get('/', function (req,res) {
    if(req.session.loggedin) {
        res.redirect('/home');
    } else {
        res.render('login', {loginCSS: true});
    }   
});

router.get('/home', userController.home);
router.get('/home/allPost', userController.allMyPosts);
router.get('/logout', userController.logout);
router.post('/auth',userController.authentication);
router.post('/about', userController.about);
router.post('/register', userController.register);

router.get('/editProfile', function (req, res) {
    if(req.session.loggedin) {
        res.render('editProfile', {user: req.session.user, homeCSS: true});
        console.log(req.session.user);
    } else {
        res.render('login', {loginCSS: true});
    } 
    
});

router.post('/updateProfile', userController.update);
router.get('/profile/:id/like', userController.likeUser);



// post routes, seperate later
router.post('/writepost', postController.write);
router.post('/myPosts');
router.post('/searchSubject', postController.searchSubject)
router.post('/searchtopic', postController.searchTopic);

// reply routes, seperate later
router.get("/post/:idpost/replies", postController.getReplies);
router.post("/post/addReply", postController.addReply);





router.get("/profile/:id", userController.profile);

router.get("/message/:id", userController.message);


// router.get("/conversations/:id", messageController.getUserConversations);

// router.post("/message/startConversation", messageController.startConversation);

router.get("/conversations/:id", messageController2.startConversation);
router.get("/showMessages/:id", messageController2.showMessage);
router.post("/showMessages/sendMessage", messageController2.addMessage);
router.post("/message/startConversation", messageController2.addConversation);

module.exports = router;


