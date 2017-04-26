import * as Utils from "./utils";
export { Utils };

/**
 * @interface IBoilerplateOptions
 * @brief     boilerplate オプション
 */
export interface IBoilerplateOptions {
    kind: "app" | "module";     // boilerplate の種類を指定
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
    public static execute(options: IBoilerplateOptions): void {
        console.log("ok");
    }
}
