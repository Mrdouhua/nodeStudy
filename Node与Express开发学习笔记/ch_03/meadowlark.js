var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

var fortunes = [
	"AAAAAAAAAA",
	"BBBBBBBBBB",
	"CCCCCCCCCC",
];

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	var randomFortunes = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortunes: randomFortunes });
});

// 定制404
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// 505
app.use(function(req, res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C.' );
});