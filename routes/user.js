const express = require('express');
const userController = require('../controllers/user');
const postController = require('../controllers/post');

const router = express.Router();


router.get('/', function (req,res) {
    if(req.session.loggedin) {
        res.redirect('/home');
    } else {
        res.render('login', {loginCSS: true});
    }   
});

router.get('/home', userController.home);
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



// post routes, seperate later
router.post('/writepost', postController.write);
router.post('/myPosts');
router.post('/searchSubject', postController.searchSubject)

// reply routes, seperate later
router.get("/post/:idpost/replies", postController.getReplies);
router.post("/post/addReply", postController.addReply);



router.get("/profile/:id", userController.profile);

router.get("/message/:id", userController.message);

module.exports = router;


