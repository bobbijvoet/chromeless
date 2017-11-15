/**
* A basic Google Query function
* @param {string} query What to search for
* @returns {string}
*/

const google = require('../automation/google');

module.exports = (query = 'hello world', context, callback) => {

    google(query).then((data) => {
        callback(null, data);

    }, console.error.bind(console));

};
