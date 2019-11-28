let db = require('../models/userdb');

/*
exports.testConnection = (req, res, next) => {
   db.testConnection();
};
*/

exports.logout = (req,res, next) => {
    req.session.loggedin = false;
    req.session.user = null;
    res.redirect('/');
}


exports.authentication = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        let Result = db.auth(email, password);
        Result.then( ([user, filedData]) => {
            if (user.length == 0) {
                //todo, ajust the position and style of the error message
                let errorMessage = "Wrong Password";
                res.render('login', { InvalideLogin: errorMessage, loginCSS: true });
            } else {
                // res.send(user[0]);
                // req.session.sessionId = user[0].id;
                req.session.loggedin = true;
                req.session.user = user[0];
                console.log(req.session);
                res.redirect('/home')
            }
        });
    } else {
        res.send('Please enter Username and Password!');
		res.end();
    }
}

exports.register = (req, res, next) => {
    const user = {
        email: req.session.email,
		password: req.session.password,
		fname: req.session.firstName,
		lname: req.session.lastName,
		country: req.body.country,
		about: req.body.about,
		image: req.body.image,
		dob: req.body.dob
    }

    if (req.session.email) {
        let Registration = db.register(user);
        Registration.then( ([result, filedData]) => {
            // req.session.sessionId = result.insertId;
            req.session.loggedin = true;
            req.session.user = user;
            res.render('home', {user: user, homeCSS: true})
        });
    } else {
        //todo, ajust the position and style of the error message
        let errorMessage = "Session Expired, please refill your login info";
        res.render('login', { InvalideLogin: errorMessage, loginCSS: true });
    }
}

exports.about = (req, res, next) => {
    const firstName = req.body.fname;
	const lastName = req.body.lname;
	const email = req.body.email;
	const password = req.body.password;

    // need to check if email exists in db already

    if (firstName && lastName && password && email) {
        req.session.email = email;
		req.session.firstName = firstName;
		req.session.lastName = lastName;
        req.session.password = password;
        res.render('about', {loginCSS: true});
        console.log(req.body);
    }
}
