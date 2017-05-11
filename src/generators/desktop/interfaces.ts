import {
    IProjectConfigration,
    ICompileConfigration,
} from "../base";

/**
 * @interface IDesktopAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IDesktopAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "desktop";                         // プロジェクト種類
    webpackTarget?: "web" | "electron-renderer";    // Webpack target configuration
    supportCSS: true;                               // CSS を含める場合には true
}
