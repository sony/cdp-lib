import {
    IProjectConfigration,
    ICompileConfigration,
} from "../base";

/**
 * @interface ILibraryConfigration
 * @brief library module プロジェクトのコンフィギュレーション設定
 */
export interface ILibraryConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "library";                                             // プロジェクト種類 ex) library
    webpackTarget?: "node" | "web" | "electron" | "electron-renderer";  // Webpack target configuration
    moduleName?: string;                                                // メインファイル名
}
