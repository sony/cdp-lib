namespace Config {

    const global = Function("return this")();

    //_____________________________________________________________________________________________//

    /**
     * build config
     */
    export const DEBUG = ((): boolean => {
        return !!("%% build_setting %%");
    })();

    //_____________________________________________________________________________________________//

    /**
     * requirejs
     */
    global.requirejs = (() => {
        const _index = (path: string) => {
            return "../" + path;
        };
        const _module = (name: string, file?: string): string => {
            return _index("<% structureConfig.external %>/") + name + "/<% structureConfig.srcConfig.script %>/" + (file ? file : name);
        };
        const _lib = (name: string): string => {
            return _index("<% structureConfig.lib %>/<% structureConfig.srcConfig.script %>/") + name;
        };
        const _porting = (name: string): string => {
            return _index("<% structureConfig.porting %>/<% structureConfig.srcConfig.script %>/") + name;
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

        const _baseUrl = (() => {
            let webRoot = /(.+\/)[^/]*#[^/]+/.exec(location.href);
            if (!webRoot) {
                webRoot = /(.+\/)/.exec(location.href);
            }
            return webRoot[1] + "<% structureConfig.srcConfig.script %>/";
        })();

        //////////////////////////////////////////////////////////////////////////

        /**
         * require.config
         */
        const config = {
            baseUrl: _baseUrl,
            urlArgs: "bust=" + Date.now(),

            // >>>EXTERNAL_MODULES>>> external module entry
            paths: {
                // external modules
                "jquery": _module("jquery"),
                "underscore": _module("underscore"),
                "backbone": _module("backbone"),
                <%# additional %>
                <%# list %>
                "<% moduleName %>": _module("<% moduleName %>"),
                <%/ list %>
                <%# listWithCustomName %>
                "<% moduleName %>": _module("<% venderName %>", "<% fileName %>"),
                <%/ listWithCustomName %>
                <%/ additional %>

                // core frameworks
                "cdp": _module("cdp"),
                "cordova": _index("cordova"),
            },
            // <<<EXTERNAL_MODULES<<<

            //shim: {
            //},

            //packages: [
            //    // DO NOT setup manually.
            //    // use assign_lib()/assing_porting()
            //],
        };

        /* tslint:disable:no-unused-variable no-unused-vars */
        /* eslint-disable no-unused-vars */
        // internal library declaretion:
        const assign_lib        = _assign_package.bind(null, config, _lib);
        const assign_porting    = _assign_package.bind(null, config, _porting);

        // >>>LIB_DEPENDENCIES>>> package assign
        // <<<LIB_DEPENDENCIES<<<

        /* tslint:enable:no-unused-variable no-unused-vars */
        /* eslint-enable no-unused-vars */

        return config;
    })();

    //_____________________________________________________________________________________________//

    /**
     * jQuery
     */
    export function jquery(): void {
        $.support.cors = true;
        $.ajaxSetup({ cache: false });
        $.migrateMute = true;
    }

    /**
     * jQuery Mobile
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
     * localize resource settings
     */
    export const i18n: CDP.I18NOptions = {
        fallbackResources: {
            en: {
                messages: "/<% structureConfig.res %>/locales/messages.en-US.json",
            },
            ja: {
                messages: "/<% structureConfig.res %>/locales/messages.ja-JP.json",
            },
        },
        // available options
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
                loadPath: "<% structureConfig.res %>/locales/{{ns}}.{{lng}}.json",
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
