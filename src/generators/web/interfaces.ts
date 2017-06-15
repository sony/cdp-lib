import {
    IProjectConfigration,
    IBuildTargetConfigration,
} from "../base";

/**
 * @interface IWebAppConfigration
 * @brief web プロジェクトのコンフィギュレーション設定
 */
export interface IWebAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
    projectType: "web";     // プロジェクト種類
    env?: "web";            // 実行環境の target
}
