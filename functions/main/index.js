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

module.exports = (params, callback) => {
	var query = params.kwargs.query || "hello world";
	var result = gemoji.unicode[query] || gemoji.name[query]; 
	var response = {};
	if(result) {
		var emoji_text = result.name;
		response.text = emoji_text;
	}
	else {
		response.text = "No text 😞"
	}
	callback(null, response);
  	
};
