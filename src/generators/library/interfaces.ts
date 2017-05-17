import {
    IProjectConfigration,
    IBuildTargetConfigration,
} from "../base";

/**
 * @interface ILibraryConfigration
 * @brief library module プロジェクトのコンフィギュレーション設定
 */
export interface ILibraryConfigration extends IProjectConfigration, IBuildTargetConfigration {
    projectType: "library";                                     // プロジェクト種類 ex) library
    env?: "node" | "web" | "electron" | "electron-renderer";    // 実行環境の target
}
