const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();





router.get('/getUser', userController.getUser);
router.get('/getAllUser', userController.getAllUser);
router.post('/auth',userController.authentication);

module.exports = router;


/*
router.get('/testConnection', userController.testConnection);
router.get('/testSession', function(request, response) {
    request.session.username = 'test';
    console.log(request.session);
});
*/