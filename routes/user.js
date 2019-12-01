const express = require('express');
const userController = require('../controllers/user');
const postController = require('../controllers/post');

const router = express.Router();



router.get('/', function (req,res) {
    if(req.session.loggedin) {
        res.render('home', {user: req.session.user, homeCSS: true});
    } else {
        res.render('login', {loginCSS: true});
    }   
});

router.get('/home', userController.home);

router.get('/test', userController.home);

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



// router.get('/profile')


// post routes, seperate later
router.post('/writepost', postController.write);


module.exports = router;


/*
router.get('/testConnection', userController.testConnection);
router.get('/testSession', function(request, response) {
    request.session.username = 'test';
    console.log(request.session);
});
*/