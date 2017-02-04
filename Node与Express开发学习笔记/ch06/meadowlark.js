var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

app.use(express.static(__dirname + '/public'));

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
		
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && 
		req.query.test === '1';
	next();
});

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { 
		fortunes: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	 });
});

app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// 定制404
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// 500
app.use(function(req, res){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

if( app.thing === null ) {
	console.log('bleat!');
}

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C.' );
});
