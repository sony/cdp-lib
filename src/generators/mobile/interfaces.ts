import {
    IProjectConfigration,
    ICompileConfigration,
} from "../base";

/**
 * @interface IMobileAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IMobileAppConfigration extends IProjectConfigration, ICompileConfigration {
    projectKind: "mobile";  // プロジェクト種類
    webpackTarget?: "web";  // Webpack target configuration
    supportCSS: true;       // CSS を含める場合には true
}
