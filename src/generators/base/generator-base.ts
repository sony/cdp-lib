/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import {
    IProjectConfigration,
} from "./interfaces";

/**
 * @class GeneratorBase
 * @brief すべての Generator の既定クラス
 */
export abstract class GeneratorBase {

    /**
     * constructor
     *
     * @param {IProjectConfigration} config コンフィグ
     */
    constructor(private _config: IProjectConfigration) {
    }

    ///////////////////////////////////////////////////////////////////////
    // pubic methods:

    /**
     * 処理開始 (エントリ)
     *
     */
    public run(): Promise<void> {
        switch (this._config.action) {
            case "create":
                return this.runCreate(this._config);
            default:
                return Promise.reject("unknown action: " + this._config.action);
        }
    }

    ///////////////////////////////////////////////////////////////////////
    // abstract methods:

    abstract create(config: IProjectConfigration): Promise<void>;

    ///////////////////////////////////////////////////////////////////////
    // protected methods:

    /**
     * 進捗テキストを通知
     *
     * @param {String} message 情報
     */
    protected notify(message: string): void {
        // TODO:
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * create 処理のエントリ
     */
    private runCreate(config: IProjectConfigration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.createBase()
                .then(() => {
                    return this.create(config);
                })
                .then(() => {
                    resolve();
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    /**
     * 共通の create 処理
     */
    private createBase(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // TODO:
            resolve();
        });
    }
}
