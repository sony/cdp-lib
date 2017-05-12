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
    src: string;                                // ソースコードのルートディレクトリ名
    pkg: string;                                // パッケージ先ディレクトリ名
    built: string;                              // コンパイル先ディレクトリ名
    doc: string;                                // ドキュメントディレクトリ名
    task: string;                               // タスクディレクトリ名
    test: string;                               // テストディレクトリ名
    types: string;                              // TypeScript 型定義ディレクトリ名
    srcConfig?: ISourceDirctoryConfigration;    // ISourceDirctoryConfigration
}

/**
 * @interface IProjectConfigration
 * @brief プロジェクト共通のコンフィギュレーション設定
 */
export interface IProjectConfigration {
    projectName: string;                            // プロジェクト名 ex) cdp-lib
    projectKind: string;                            // プロジェクト種類 ex) library
    action: string;                                 // ex) create
    version: string;                                // バージョン ex) 1.0.0
    license: string;                                // ライセンス ex) Apache-2.0
    settings: Utils.IGlobalSettings;                // ログオプション
    namespace?: string;                             // ルート名前空間
    structureConfig?: IBaseStructureConfigration;   // IBaseStructureConfigration
}

/**
 * @interface ICompileConfigration
 * @brief コンパイルコンフィギュレーション設定
 */
export interface ICompileConfigration {
    // TypeScript
    tsTranspileTarget?: "es5" | "es2015";                   // TypeScript の transpile target
    moduleSystem?: "none" | "commonjs" | "amd" | "umd";     // JavaScript module system
    // Webpack
    webpackTarget?: string;                                 // Webpack target configuration
    // CSS
    supportCSS?: boolean;                                   // CSS を含める場合には true
}
