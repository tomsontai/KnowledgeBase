let db = require('../models/userdb');
let postdb = require('../models/postdb');

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

exports.home = (req, res, next) => {
    if(req.session.loggedin) {
        var id = req.session.user.id;
        let Home = db.getUser(id);
        Home.then( ([user, filedData]) => {
            if (user.length == 0) {
                //todo, ajust the position and style of the error message
                let errorMessage = "User not exists";
                res.render('login', { InvalideLogin: errorMessage, loginCSS: true });
            } else {
                req.session.user = user[0];
                let RecentPosts = postdb.getRecentPosts();
                RecentPosts.then( ([posts, filedData]) => {
                    req.session.posts = posts;
                    res.render('home', {
                        user: req.session.user,
                        posts: req.session.posts,
                        homeCSS: true
                    });
                });
            }
        });
    } else {
        res.render('login', {loginCSS: true});
    }  
}

exports.allMyPosts = (req, res, next) => {
    if(req.session.loggedin) {
        var id = req.session.user.id;

        let Posts = postdb.getPostByUser(id);
        Posts.then( ([posts, fieldData] ) => {
            res.render('home', {
                user: req.session.user,
                posts: posts,
                homeCSS: true,
                allPost: true
            });
        });
    } else {
        res.render('login', {loginCSS: true});
    } 
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
            user.id = result.insertId;
            req.session.loggedin = true;
            req.session.user = user;
            res.redirect('/home');
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
        let EmailExists = db.emailCheck(email);
        EmailExists.then( ([user, filedData]) => {
            if (user.length == 0) {
                req.session.email = email;
                req.session.firstName = firstName;
                req.session.lastName = lastName;
                req.session.password = password;
                res.render('about', {loginCSS: true});
            } else {
                // res.send(user[0]);
                // req.session.sessionId = user[0].id;
                res.redirect('/');
            }
        });  
    }
}

exports.update = (req, res, next) => {
    const user = {
        id: req.session.user.id,
        email: req.session.user.email,
		password: req.session.user.password,
		fname: req.body.fname,
		lname: req.body.lname,
		country: req.body.country,
		about: req.body.about,
		image: req.body.image,
		dob: req.body.dob
    }

    let Update = db.update(user);
    Update.then( ([result, filedData]) => {
        res.redirect('/home');
    });
}

exports.profile = (req, res, next) => {
    if(req.session.loggedin) {
        if (req.session.user.id != req.params.id) {
            let iduser = req.params.id;
            let Profile = db.getUser(iduser);
            Profile.then ( ([data, fieldData])  => {
                if (data.length == 0) {
                    res.redirect("/home");
                } else {
                    let user = data[0];
                    let UserPosts = postdb.getPostByUser(iduser);
                    UserPosts.then( ([posts, filedData]) => {
                        res.render('profile', {
                            user: user,
                            posts: posts,
                            profileCSS: true
                        });
                    });
                }
            });
        } else {
            res.redirect('/home/allPost');
        }
    } else {
        res.render('login', {loginCSS: true});
    }
}




exports.likeUser = (req, res, next) => {
    let id = req.params.id;
    let Result = db.likeUser(id);
    Result.then(result => {
        console.log(result);
        res.redirect('/profile/' +id);
    });

}

exports.message = (req,res,next) => {

    let iduser = req.params.id;
    let Profile = db.getUser(iduser);
    Profile.then ( ([data, fieldData])  => {
        if (data.length == 0) {
            //todo, ajust the position and style of the error message
            let errorMessage = "User not exists";
            res.redirect("/home");
        } else {
            let user = data[0];
            res.render('message', {
                user: user,
                homeCSS: true
            });
        }
    });
}