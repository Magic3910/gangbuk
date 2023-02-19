var express   = require('express');
var app       = express();
var passport  = require('passport');
var session   = require('express-session');

var bodyParser = require('body-parser');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(session({secret:'MySecret', resave: false, saveUninitialized:true}));
// Passport setting
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views'));
// Routes
app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
