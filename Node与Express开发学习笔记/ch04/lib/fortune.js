var fortunes = [
	"AAAAAAAAAA",
	"BBBBBBBBBB",
	"CCCCCCCCCC",
];

exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortunes.length);
	return fortunes[idx];
};