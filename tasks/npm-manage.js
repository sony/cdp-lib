const spawn = require('child_process').spawn;

// command
function command(commandString, shouldEnd) {
    let commandArguments = commandString.trim().split(' ');
    let cmd = commandArguments.shift() + ((process.platform === 'win32') ? '.cmd' : '');
    let child = spawn(cmd, commandArguments);
    child.stdout.pipe(process.stdout, { end: shouldEnd });
    child.stderr.pipe(process.stderr, { end: shouldEnd });
    process.stdin.pipe(child.stdin);
}

// npm install
function npm(operation, callback) {
    console.log('*** Start npm '+ operation + ' ***');

    let npmcmd = (process.platform === 'win32' ? 'npm.cmd' : 'npm');
    let _npm;

    try {
        _npm = spawn(npmcmd, operation.trim().split(' '), { cwd: process.cwd(), stdio: 'inherit' });
    } catch (error) {
        handleError('error: ' + error);
    }

    _npm
        .on('error', function (error) {
            handleError('error: ' + error);
        })
        .on('close', function (code) {
            if (0 === code) {
                console.log('*** End npm ' + operation + ' ***\n');
                if (callback) {
                    callback();
                }
            } else {
                handleError('*** Faild npm ' + operation + ' *** : error code = ' + code + '\n');
            }
        });
}

function handleError(msg) {
    console.log(msg);
    // Returned exit code = 1(Fail)
    process.exit(1);
}

function main () {
    if (process.platform === 'win32') {
        command('start-ssh-agent', true);
    }

    let operation = 'install';
    if (0 <= process.argv.slice(2/*node npm-manage.js*/).join(';').indexOf('--update')) {
        operation = 'update --save';
    }

    npm(operation, function () {
        process.exit(0);
    });
}

main();
