const fs = require("fs-extra");

const DIST_DIR = "./dist/"

function clean() {
    fs.removeSync(DIST_DIR);
}

function main() {
    clean();
}

main();
