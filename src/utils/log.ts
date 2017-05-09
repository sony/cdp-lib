/**
 * @interface ILogOptions
 * @brief ログオプションインターフェイス
 */
export interface ILogOptions {
    force: boolean;     // エラー継続用
    verbose: boolean;   // 詳細ログ
    silent: boolean;    // silent mode
}

let _settings: ILogOptions = {
    force: false,
    verbose: false,
    silent: false,
};

/**
 * オプション指定
 *
 * @param {ILogOptions} options ログに使用するオプション
 */
export function setOptions(options: ILogOptions): void {
    if (options) {
        _settings.force = options.force || _settings.force;
        _settings.force = options.verbose || _settings.verbose;
        _settings.force = options.silent || _settings.silent;
    } else {
        _settings = {
            force: false,
            verbose: false,
            silent: false,
        };
    }
}

/**
 * ログ出力
 * console.log() と同等
 *
 * @param {String} message        出力メッセージ
 * @param {Any[]}  optionalParams 付加情報
 */
export function log(message?: string, ...optionalParams: any[]): void {
    if (!_settings.silent) {
        if (0 < optionalParams.length) {
            console.log(message, optionalParams);
        } else {
            console.log(message);
        }
    }
}

/**
 * 詳細ログ出力
 * console.debug() と同等
 *
 * @param {String} message        出力メッセージ
 * @param {Any[]}  optionalParams 付加情報
 */
export function debug(message?: string, ...optionalParams: any[]): void {
    if (!_settings.silent && _settings.verbose) {
        if (0 < optionalParams.length) {
            console.error("DEBUG: " + message, optionalParams);
        } else {
            console.error("DEBUG: " + message);
        }
    }
}

/**
 * 検証
 * console.assert() と同等
 *
 * @param {Boolean} test           検証する式
 * @param {String}  message        出力メッセージ
 * @param {Any[]}   optionalParams 付加情報
 */
export function assert(test?: boolean, message?: string, ...optionalParams: any[]): void {
    if (!test) {
        if (_settings.force) {
            if (0 < optionalParams.length) {
                console.warn(message, optionalParams);
            } else {
                console.warn(message);
            }
        } else {
            if (0 < optionalParams.length) {
                console.error(message, optionalParams);
            } else {
                console.error(message);
            }
            process.exit(1);
        }
    }
}
