const path      = require('path');
const settings  = require(path.join(__dirname, 'testem.json'));
const proj      = require('../../project.config');

const config = {
    test_page: proj.dir.test + '/runner/index.mustache',
};

module.exports = Object.assign({}, settings, config);
