let express = require('express');
let bodyParser = require('body-parser');
let path = require("path");
let fs = require("fs");
let util = require('util');
var session = require('express-session');

let app = express();


const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));



app.get('/', function (req,res) {
    res.render('login', {loginCSS: true});
});

let userRoutes = require('./routes/user');
app.use(userRoutes);

app.listen(8080, () => console.log('Server ready'))