import {
    IProjectConfigration,
    IBuildTargetConfigration,
    IDependency,
} from "../base";

/**
 * @interface IExternalModuleInfo
 * @brief 外部ライブラリの定義
 */
export interface IExternalModuleInfo {
    acquisition: "npm" | "npm:dev" | "cordova" | "resource";    // 取得先
    regular: boolean;                                           // 既定でインストールに含めるか
    subset?: IExternalModules;                                  // サブセットモジュール
}

/**
 * @interface IExternalModules
 * @brief 外部ライブラリの一覧定義
 */
export interface IExternalModules {
    [name: string]: IExternalModuleInfo;
}

/**
 * @interface IMobileAppConfigration
 * @brief mobile プロジェクトのコンフィギュレーション設定
 */
export interface IMobileAppConfigration extends IProjectConfigration, IBuildTargetConfigration {
    projectType: "mobile";                  // プロジェクト種類
    env?: "web";                            // 実行環境の target
    appName: string;                        // アプリケーション名
    appId?: string;                         // アプリケーション ID
    platforms?: string[];                   // サポート OS プラットフォーム "android" | "ios"
    projectStructure?: ["lib" | "porting"]; // サポートプロジェクト構成 "lib" | "porting"
    external?: IExternalModules;            // プリセットに含める外部モジュール
    dependencies?: IDependency[];           // npm 依存モジュール情報
    cordova_plugin?: IDependency[];         // cordova plugin モジュール情報
    resource_addon?: IDependency[];         // local resource モジュール情報
}
