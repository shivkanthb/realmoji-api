var gemoji = require('gemoji');
var imojiClient = new (require("imoji-node"))({
        apiKey: process.env.imoji_key,
        apiSecret: process.env.imoji_secret
    });

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

module.exports = (params, callback) => {
	var query = params.kwargs.query || "hello";
	var result = gemoji.unicode[query] || gemoji.name[query]; 
	var response = {};
	
	if(result)
    	getSticker(result.name, callback);
    else
    	getSticker(query, callback);
};
