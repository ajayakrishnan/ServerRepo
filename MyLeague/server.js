var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');

var router = require('./routes');

var tasks = require('./routes/myteam-details');

var port = 4001;

var app = express();

//view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', router);
app.use('/api',tasks);

app.listen(port, function(){
    console.log('Server started on port' +port);
});