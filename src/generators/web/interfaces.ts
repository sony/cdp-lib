import {
    IProjectConfigration,
    ICompileConfigration,
} from "../base";

/**
 * @interface IWebAppConfigration
 * @brief web プロジェクトのコンフィギュレーション設定
 */
export interface IWebAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "web";     // プロジェクト種類
    webpackTarget?: "web";  // Webpack target configuration
    supportCSS: true;       // CSS を含める場合には true
}
