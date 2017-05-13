var gemoji = require('gemoji');
var imojiClient = new (require("imoji-node"))({
        apiKey: process.env.imoji_key,
        apiSecret: process.env.imoji_secret
    });
var emojione = require('emojione');

var getSticker = function(input, cb) {
	var response = {};
	imojiClient.random({
    	query: input
    })
    .then(function (random) {
        if(random.results.length>0)
        {
            var url = random.results[0].urls.png.thumb;
            response.status = "SUCCESS";
            response.url = url;
        }
        else
        	response.message = "No results found";
        cb(null, response);
    })
    .catch(function (err) {
        console.error(err);
        cb(err, null);
    });
}

var getImage = function(input, cb) {
    if(!input) {
        cb({"error":"query parameter empty"}, null);
        return;
    }

    var response = {};
    var output = emojione.toImage(input);
    var str = output,
    re = /\ssrc=(?:(?:"([^"]*)"))/i, // match src="<url>"
    res = str.match(re);
    if(!res) {
        cb({"error":"No emoji found"}, null);
        return;
    }
    var src = res[1]||res[2]||res[3];
    response.status = "SUCCESS";
    response.url = src;
    cb(null, response);
}

module.exports = (params, callback) => {
	var query = params.kwargs.query || "hello";
    var toImage = params.kwargs.toImage || false;

    if(toImage) {
        getImage(query, callback);
        return;
    }

	var result = gemoji.unicode[query] || gemoji.name[query]; 
	if(result)
    	getSticker(result.name, callback);
    else
    	getSticker(query, callback);
};
