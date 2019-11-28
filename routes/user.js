const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();



router.get('/', function (req,res) {
    if(req.session.loggedin) {
        res.render('home', {user: req.session.user, homeCSS: true})
    } else {
        res.render('login', {loginCSS: true});
    }   
});

router.get('/home', function (req,res) {
    if(req.session.loggedin) {
        res.render('home', {user: req.session.user, homeCSS: true})
    } else {
        res.render('login', {loginCSS: true});
    }   
});

router.get('/logout', userController.logout);
router.post('/auth',userController.authentication);
router.post('/about', userController.about);
router.post('/register', userController.register);

router.post('/editUser');

router.get('/home');

router.get('/profile')



module.exports = router;


/*
router.get('/testConnection', userController.testConnection);
router.get('/testSession', function(request, response) {
    request.session.username = 'test';
    console.log(request.session);
});
*/