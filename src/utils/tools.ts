/// <reference types="node" />

/* tslint:disable:no-unused-variable */
/* eslint-disable no-unused-vars */

import {
    fs,
    $,
    which,
    chalk,
    Spinner,
} from "./libs";

import { spawn, SpawnOptions } from "child_process";

///////////////////////////////////////////////////////////////////////
// exports methods:

/**
 * Get spinner instance.
 * CLI helper.
 *
 * @param  {String}  format  spinner format string.
 * @param  {Number}  index   spinner index defined by cli-spinner. (default: random [0-9])
 * @return {Spinner} cli-spinner instance.
 */
export function getSpinner(format: string, index: number): { start: () => void; stop: (clean?: boolean) => void; } {
    let fmt = format || "%s";
    let spinner = new Spinner(fmt);
    let idx = (null != index && 0 <= index && index < 10) ? index : Math.floor(Math.random() * 9); // random value of preset array[0-9]
    spinner.setSpinnerString(Spinner.spinners[idx]);
    return spinner;
}

//___________________________________________________________________________________________________________________//

/**
 * @interface ExecCommandOptions
 * @brief execCommand() に指定するオプション
 */
export interface ExecCommandOptions extends SpawnOptions {
    spinner?: {
        format?: string;    // ex) "%s"
        index?: number;     // 0 - 9 の数値を指定
    };
}

/**
 * Execute command line by spawn.
 * call spawn. if error occured, cui is killed proccess.
 *
 * @param   {String}               command    main command. ex) "cordova"
 * @param   {String[]}             args       command args. ex) ["plugin", "add", pluginName]
 * @param   {ExecCommandOptions}   [options]  cli-spinner"s options.
 * @returns {Number} error code
 */
export function execCommand(command: string, args: string[], options?: ExecCommandOptions): JQueryPromise<number> {
    let df = $.Deferred();
    let opt: ExecCommandOptions = $.extend({}, {
        stdio: "inherit",
        spinner: { format: "%s" },
    }, options);

    which(command, (error, resolvedCommand) => {
        if (error) {
            handleError(JSON.stringify(error));
        }

        let spinner = opt.spinner ? getSpinner(opt.spinner.format, opt.spinner.index) : null;
        if (spinner) {
            spinner.start();
        }

        spawn(resolvedCommand, args, opt)
            .on("error", handleError)
            .on("close", (code) => {
                if (spinner) {
                    spinner.stop(true);
                }
                df.resolve(code);
            });
    });

    return df.promise();
}

///////////////////////////////////////////////////////////////////////
// private methods:

/**
 * Handle command line error and kill process.
 * When the application received error from cli, please call this method.
 *
 * @param {String} error  error information.
 */
function handleError(error: string) {
    console.error(chalk.red(error));
    // returned exit code = 1 (fail)
    process.exit(1);
}
