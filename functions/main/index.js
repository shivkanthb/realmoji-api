/* Import dependencies, declare constants */

/**
* Your function call
* @param {Object} params Execution parameters
*   Members
*   - {Array} args Arguments passed to function
*   - {Object} kwargs Keyword arguments (key-value pairs) passed to function
*   - {String} remoteAddress The IPv4 or IPv6 address of the caller
*
* @param {Function} callback Execute this to end the function call
*   Arguments
*   - {Error} error The error to show if function fails
*   - {Any} returnValue JSON serializable (or Buffer) return value
*/

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
	console.log("key :"+process.env.imoji_key);
	var query = params.kwargs.query || "hello world";
	var result = gemoji.unicode[query] || gemoji.name[query]; 
	var response = {};
	
	if(result)
    	getSticker(result.name, callback);
    else
    	getSticker(query, callback);

};
