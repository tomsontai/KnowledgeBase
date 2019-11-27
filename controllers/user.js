let db = require('../models/userdb');

/*
exports.testConnection = (req, res, next) => {
   db.testConnection();
};
*/

exports.getUser = (req, res, next) => {
    let Users = db.getUser(req.params.id);
    Users.then( ([user, filedData]) => {
        console.log(user);
    });
}

exports.getAllUser = (req, res, next) => {
    let Users = db.getAllUser();
    Users.then( ([user, filedData]) => {
        console.log(user);
    });
}

exports.authentication = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        let Result = db.auth(email, password);
        Result.then( ([user, filedData]) => {
            if (user.length == 0) {
                errorMessage = "Wrong Password";
                res.render('login', { InvalideLogin: errorMessage });
            } else {
                res.send(user[0]);
                req.session.sessionId = user[0].id;
                req.session.loggedin = true;
                console.log(req.session);
            }
        });
    } else {
        res.send('Please enter Username and Password!');
		res.end();
    }
}

