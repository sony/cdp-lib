namespace Config {

    const global = Function("return this")();

    //_____________________________________________________________________________________________//

    /**
     * ビルド設定判定
     *
     * リリース版では '%% build_setting %%' を '' (空文字列) に置換することにより
     *   !!("") (== false)
     * の設定が反映される
     */
    export const DEBUG = ((): boolean => {
        return !!("%% build_setting %%");    //! リリース時には false が返る
    })();

    // 開発モード
    export const DEV_FUNCTIONS_ENABLED = ((): boolean => {
        return !!("%% dev_functions_enabled %%");
    })();

    // 接続先サーバー
    export const TARGET_SERVER = ((): string => {
        return "%% target_server %%";
    })();

    // 任意の置換
    export const RUNTIME_CONTEXT = ((): string => {
        return "%% runtime_context %%";
    })();

    //_____________________________________________________________________________________________//

    /**
     * requirejs 設定
     */
    global.requirejs = (() => {
        // webRoot を示す相対パス
        const _index = (path: string) => {
            return "../" + path;
        };
        const _module = (name: string, file?: string): string => {
            return _index("modules/") + name + "/scripts/" + (file ? file : name);
        };
        const _lib = (name: string): string => {
            return _index("lib/scripts/") + name;
        };
        const _porting = (name: string): string => {
            return _index("porting/scripts/") + name;
        };
        const _assign_package = (
            _config: { paths: {}; packages?: {}[]; },
            _path: (name: string) => string,
            name: string, main?: string) => {
            if (DEBUG) {
                _config.packages = _config.packages || [];
                _config.packages.push({
                    name: name,
                    location: _path(name),
                    main: main,
                });
            } else {
                _config.paths[name] = _path(name);
            }
        };

        // [重要] baseUrl を絶対パスとして指定することで、任意の html の配置位置からよばれても適切にパスを解決可.
        const _baseUrl = (() => {
            let webRoot = /(.+\/)[^/]*#[^/]+/.exec(location.href); // "#" がある場合
            if (!webRoot) {
                webRoot = /(.+\/)/.exec(location.href); // "#" がない場合。 query parametersは使用不可
            }
            return webRoot[1] + "scripts/";
        })();

        //////////////////////////////////////////////////////////////////////////

        /**
         * require.config 設定
         */
        const config = {
            baseUrl: _baseUrl,
//          urlArgs: "bust=" + Date.now(),

            // >>>EXTERNAL_MODULES>>> external module entry
            paths: {
                // external modules
                "jquery": _module("jquery"),
                "underscore": _module("underscore"),
                "backbone": _module("backbone"),
                "hogan": _module("hogan"),
                "iscroll": _module("iscroll", "iscroll-probe"),

                // core frameworks
                "cdp": _module("cdp"),
                "cordova": _index("cordova"),
            },
            // <<<EXTERNAL_MODULES<<<

            //packages: [
            //    // using assign_package
            //],

            //shim: {
            //},
        };

        // internal library declaretion:

        const assign_lib        = _assign_package.bind(null, config, _lib);
        const assign_porting    = _assign_package.bind(null, config, _porting);

        // >>>LIB_DEPENDENCIES>>> package assign
        // >>>PERROQUET>>> package assign (PERROQUET compatible test)
        assign_lib("foo");
        assign_lib("bar", "index");
        assign_porting("porting-test");
        // <<<PERROQUET<<<
        // <<<LIB_DEPENDENCIES<<<

        return config;
    })();

    //_____________________________________________________________________________________________//

    /**
     * jQuery 設定
     */
    export function jquery(): void {
        $.support.cors = true;          // cross domain request を許可
        $.ajaxSetup({ cache: false });  // ajax の cache を無効化
        $.migrateMute = true;           // migrate 警告の抑止
    }

    /**
     * jQuery Mobile 設定
     * http://api.jquerymobile.com/global-config/
     */
    export function jquerymobile(): void {
        $.mobile.allowCrossDomainPages = true;
        $.mobile.defaultPageTransition = "none";
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    }

    //_____________________________________________________________________________________________//

    /**
     * ローカライズリソース設定
     * localize resource settings
     */
    export const i18n: CDP.I18NOptions = {
        fallbackResources: {
            en: {
                messages: "/res/locales/messages.en-US.json",
            },
            ja: {
                messages: "/res/locales/messages.ja-JP.json",
            },
        },
        // i18next の設定
        // http://i18next.com/docs/options/#init-options
        options: {
            preload: [
                "en-US",
                "ja-JP",
            ],
            fallbackLng: "en-US",
            ns: "messages",
            defaultNS: "messages",
            backend: {
                loadPath: "res/locales/{{ns}}.{{lng}}.json",
            },
            detection: {
                order: ["cookie", "navigator"],
                caches: false,
            },
            cache: {
                enable: false,
            },
        },
    };
}
