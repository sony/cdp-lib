import {
    IProjectConfigration,
    IBuildTargetConfigration,
} from "../base";

/**
 * @interface IDesktopAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IDesktopAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
    projectType: "desktop";                         // プロジェクト種類
    env?: "web" | "electron-renderer";              // 実行環境の target
}
