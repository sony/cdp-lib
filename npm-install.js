var spawn = require('child_process').spawn;

// command
function command(commandString, shouldEnd) {
    var commandArguments = commandString.trim().split(' ');
    var cmd = commandArguments.shift() + ((process.platform === 'win32') ? '.cmd' : '');
    var child = spawn(cmd, commandArguments);
    child.stdout.pipe(process.stdout, { end: shouldEnd });
    child.stderr.pipe(process.stderr, { end: shouldEnd });
    process.stdin.pipe(child.stdin);
}

// npm install
function npm(callback) {
    console.log('*** Start npm install ***');

    var npmcmd = (process.platform === 'win32' ? 'npm.cmd' : 'npm');

    try {
        var npm = spawn(npmcmd, ['install'], { cwd: process.cwd(), stdio: 'inherit' });
    } catch (error) {
        console.log('error: ' + error);
    }

    npm.on('error', function (err) {
        errorHandler(err);
    });
    npm.on('close', function (code) {
        if (0 === code) {
            console.log('*** End npm install ***\n');
            if (callback) {
                callback();
            }
        } else {
            console.log('*** Faild npm install *** : error code = ' + code + '\n');
            // Returned exit code = 1(Fail)
            process.exit(1);
        }
    });
}

function main () {
    if (process.platform === 'win32') {
        command('start-ssh-agent', true);
    }
    npm(function () {
        process.exit(0);
    });
}

main();
