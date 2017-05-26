const path  = require('path');
const fs    = require('fs');
const http  = require('http');
const shell = require('shelljs');
const proj  = require('../../project.config');

const TEMP_DIR = path.join(__dirname, '../../', proj.dir.temp);

// ensure temp dir
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

let server;
const port = 7358;

const settings = require(path.join(__dirname, 'testem.json'));

const config = {
    proxies: {
        '/coverage': {
            'target': 'http://localhost:' + port,
        }
    },

    before_tests: function (config, data, callback) {
        // start the server
        server = http.createServer(function (req, res) {
            console.log('... Received coverage of', req.headers['content-length'], 'length');
            req.pipe(fs.createWriteStream(path.join(TEMP_DIR, 'coverage.json')));
            req.on('end', res.end.bind(res));
        }).listen(port, function (serverErr) {
            console.log(' Listening for coverage on ' + port);
            callback(serverErr);
        });
    },

    after_tests: function (config, data, callback) {
        server.close();
        callback(null);
    },

    test_page: proj.dir.test + '/runner/index.mustache',
};

module.exports = Object.assign({}, settings, config);
