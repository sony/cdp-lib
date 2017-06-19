import * as Backbone from "backbone";

import { Router } from "cdp/framework";
import { PageView, HideEventData } from "cdp/ui";

import { SampleInherit } from "bar";

import CheckModel from "../model/check-model";

const TAG = "[view.MainView] ";

/**
 * @class MainView
 * @brief メインビュークラス
 */
export class MainView extends PageView<Backbone.Model> {

    private _libTest: SampleInherit;
    private _count = 0;

    /**
     * constructor
     */
    constructor() {
        super("/templates/main.html", "page-main", {
            route: "page-main"
        });
        this._libTest = new SampleInherit();
    }

    ///////////////////////////////////////////////////////////////////////
    // Event Handler

    //! イベントハンドラのマッピング
    events(): any {
        return {
            "vclick .command-hello": this.onHello,
            "vclick .command-porting": this.onPorting,
        };
    }

    //! ".command-hello" のイベントハンドラ
    private onHello(event: JQueryEventObject): void {
        if (this._count % 2) {
            this._libTest.sayHello(CheckModel.coolMethod("from CheckModel"));
        } else {
            this._libTest.sayHello();
        }
        this._count++;

        // test
//        (<Backbone.Collection2<Backbone.Model>>this.collection).clone();
    }

    //! ".command-porting" のイベントハンドラ
    private onPorting(event: JQueryEventObject): void {
        event.preventDefault();
        // porting は app → porting の関係が基本だが、詳細を隠蔽する.
        // 必要な場合は global を利用してデータをやり取りできるが、第1に設計を見直す.
//        console.log(require.toUrl("porting-test"));
        require(["porting-test"], () => {
            Router.navigate("#porting-test", "platform-default");
        });
    }

    ///////////////////////////////////////////////////////////////////////
    // Override: UI.PageView

    //! jQM event: "pagebeforecreate" に対応
    onPageBeforeCreate(event: JQueryEventObject): void {
        super.onPageBeforeCreate(event);
    }

    //! jQM event: "pagecreate" (旧:"pageinit") に対応
    onPageInit(event: JQueryEventObject): void {
        super.onPageInit(event);
    }

    //! jQM event: "pagebeforehide" に対応
    onPageBeforeHide(event: JQueryEventObject, data: HideEventData): void {
        super.onPageBeforeHide(event, data);
    }
}

const __viewMainView = new MainView();
