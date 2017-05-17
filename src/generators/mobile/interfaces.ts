import {
    IProjectConfigration,
    IBuildTargetConfigration,
} from "../base";

/**
 * @interface IMobileAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IMobileAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
    projectType: "mobile";  // プロジェクト種類
    env?: "web";            // 実行環境の target
    supportCSS: true;       // CSS を含める場合には true
}
