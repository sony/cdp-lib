import * as Utils from "./utils";
export { Utils };

/**
 * @interface IProjectConfigration
 * @brief プロジェクト共通のコンフィギュレーション設定
 */
export interface IProjectConfigration {
    projectName: string;    // プロジェクト名 ex) cdp-lib
    projectKind: string;    // プロジェクト種類 ex) library
    version: string;        // バージョン ex) 1.0.0
    license: string;        // ライセンス ex) Apache-2.0
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

/**
 * @interface ILibraryConfigration
 * @brief library module プロジェクトのコンフィギュレーション設定
 */
export interface ILibraryConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "library";                                             // プロジェクト種類 ex) library
    webpackTarget?: "node" | "web" | "electron" | "electron-renderer";  // Webpack target configuration
}

/**
 * @interface IMobileAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IMobileAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "mobile";  // プロジェクト種類
    webpackTarget?: "web";  // Webpack target configuration
    supportCSS: true;       // CSS を含める場合には true
}

/**
 * @interface IDesktopAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IDesktopAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "desktop";                         // プロジェクト種類
    webpackTarget?: "web" | "electron-renderer";    // Webpack target configuration
    supportCSS: true;                               // CSS を含める場合には true
}

/**
 * @interface IWebAppConfigration
 * @brief web プロジェクトのコンフィギュレーション設定
 */
export interface IWebAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "web";     // プロジェクト種類
    webpackTarget?: "web";  // Webpack target configuration
    supportCSS: true;       // CSS を含める場合には true
}

//___________________________________________________________________________________________________________________//

/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
export class CDPLib {
    /**
     * main command
     */
    public static execute(options: IProjectConfigration): void {
        console.log("ok");
    }
}
