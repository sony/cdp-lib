// AMD entries module must be named for releases build
/// <amd-module name="app" />

// AMD dependenciy entries
import "hogan";
import "./view/loader";

/*
 * NOTE: tsconfig 設定覚書
 *  - module を amd rename する場合は、types: ["cdp"] 必須
 *   import { global, Framework, UI } from "cdp";
 *  - node_modules 配下を自動解決する場合 moduleResolution: "node" 必須
 *   import { global, Framework, UI } from "@cdp/mobile";
 */

import { global } from "cdp";
import { Router as router } from "cdp/framework";
import { Theme } from "cdp/ui";

// AMD global exports example
import * as IScroll from "iscroll";
/* tslint:disable:no-string-literal */
global["IScroll"] = IScroll;
/* tslint:enable:no-string-literal */

const TAG: string = "[app] ";

function onStart(): void {
    // for dev. always show vertical scroll bar.
    Theme.detectUIPlatform();

    router.register("", "/templates/main.html", true);
    // start Router.
    router.start();
}

export { onStart as main };
