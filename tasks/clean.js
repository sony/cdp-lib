const fs    = require('fs-extra');
const path  = require('path');
const glob  = require('glob');

const DIST_DIR  = "./dist/"
const BUILT_DIR = "./built/"
const TEST_DIR = "./tests/jasmine/"

function main() {
    fs.removeSync(DIST_DIR);
    fs.removeSync(BUILT_DIR);

    let files = glob.sync('{*.js,*.map}', {
        cwd: TEST_DIR,
        nodir: true,
    });

    files.forEach(function (file) {
        fs.unlinkSync(path.join(TEST_DIR, file));
        console.log('removed: ' + file);
    });
}

main();
