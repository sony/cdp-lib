import * as Utils from "../../utils";
export { Utils };

/**
 * @interface ISourceDirctoryConfigration
 * @brief ソースディレクトリのコンフィギュレーション設定
 */
export interface ISourceDirctoryConfigration {
    script?: string;            // js(ts) ファイル保存先
    stylesheet?: string;        // css(css) ファイル保存先
    template?: string;          // html(template) ファイル保存先
}

/**
 * @interface IBaseStructureConfigration
 * @brief プロジェクトディレクトリのコンフィギュレーション設定
 */
export interface IBaseStructureConfigration {
    src?: string;                               // ソースコードのルートディレクトリ名
    pkg?: string;                               // パッケージ先ディレクトリ名
    built?: string;                             // コンパイル先ディレクトリ名
    doc?: string;                               // ドキュメントディレクトリ名
    task?: string;                              // タスクディレクトリ名
    test?: string;                              // テストディレクトリ名
    types?: string;                             // TypeScript 型定義ディレクトリ名
    temp?: string;                              // 作業ディレクトリ名
    srcConfig?: ISourceDirctoryConfigration;    // ISourceDirctoryConfigration
    lib?: string;                               // internal library module ディレクトリ名
    external?: string;                          // external module ディレクトリ名
    porting?: string;                           // porting module ディレクトリ名
    res?: string;                               // リソースディレクトリ名
}

/**
 * @interface IDependency
 * @brief package.json に指定する dependencies 情報を格納するインターフェイス
 */
export interface IDependency {
    name: string;           // module name ex) "typescript"
    version?: string;       // 指定バージョン. 無指定の場合は最新バージョン
    es?: string[];          // 指定された ES version のときのみ有効にする
}

/**
 * @interface IProjectConfigration
 * @brief プロジェクト共通のコンフィギュレーション設定
 */
export interface IProjectConfigration {
    projectName: string;                            // プロジェクト名 ex) "cdp-lib"
    projectType: string;                            // プロジェクト種類 ex) "library"
    action: string;                                 // ex) "create"
    version: string;                                // バージョン ex) "1.0.0"
    license: string;                                // ライセンス ex) "Apache-2.0"
    private?: boolean;                              // private パッケージの場合 true
    settings: Utils.IGlobalSettings;                // ログオプション
    moduleName?: string;                            // import に指定する モジュール名 ex) "cdp-lib"
    mainBaseName?: string;                          // メインファイル名 ex) "cdp-lib" / "index"
    namespace?: string;                             // ルート名前空間
    structureConfig?: IBaseStructureConfigration;   // IBaseStructureConfigration
    copyright?: string;                             // コピーライト文字列 ex) "Copyright (c) 2017 Sony Corporation"
    devDependencies?: IDependency[];                // 開発用依存モジュール情報
}

/**
 * @interface IBuildTargetConfigration
 * @brief ビルドターゲットコンフィギュレーション設定
 */
export interface IBuildTargetConfigration {
    es?: "es5" | "es2015";                                      // TypeScript の transpile target
    module?: "none" | "commonjs" | "amd" | "umd";               // JavaScript module system
    env?: "web" | "node" | "electron" | "electron-renderer";    // 実行環境の target
    nodejs?: boolean;                                           // "node" | "electron" の場合に true
    minify?: boolean;                                           // リリース時に minify する場合は true
    // build tool
    tools?: string[];                                           // 既定の build tool ex) ["webpack"]
    outputSameDir?: boolean;                                    // src と built が同じディレクトリになる場合 true
}

/**
 * @interface IWebpackConfigration
 * @brief Webpack 用コンフィギュレーション設定
 */
export interface IWebpackConfigration {
    nodejs: boolean;    // "node" | "electron" の場合に true
    guide: boolean;     // guide コメントを付加する場合は true を指定
    taskPath: string;   // 'task' ディレクトリ名
}

/**
 * @interface IVisualStudioConfigration
 * @brief Visual Studio 用コンフィギュレーション設定
 */
export interface IVisualStudioConfigration extends IBaseStructureConfigration {
    projectName: string;        // プロジェクト名 ex) "cdp-lib"
    projectGUID: string;        // プロジェクト GUID ex) {51B41359-8D2C-42DF-8414-E85B02993238}
    mainBaseName: string;       // メインファイル名 ex) "cdp-lib" / index
    license: boolean;           // LICENSE を追加する場合は true
    webpack: boolean;           // webpack.config.js を追加する場合は true
    testem: boolean;            // testem runner を追加する場合は true
    outputSameDir: boolean;     // src と built が同じディレクトリになる場合 true
    tsGroup: {
        relativePath: string;   // "hogehoge\"
        fileName: string;       // "cdp-lib"
        dependee: boolean;      // 依存先を追加する場合 true
        map: boolean;           // .map ファイルがある場合 true
    }[];
    jsGroup: {
        relativePath: string;   // "hogehoge\"
        fileName: string;       // "cdp-lib"
        dependee: boolean;      // 依存先を追加する場合 true
        d_ts: boolean;          // .d.ts ファイルがある場合 true
        map: boolean;           // .map ファイルがある場合 true
        min_map: boolean;       // .min .map ファイルがある場合 true
    }[];
}
