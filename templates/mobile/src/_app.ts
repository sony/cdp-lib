<%# globals %>
<%# importsList %>
import "<% moduleName %>";
<%/ importsList %>
<%# hasExports %>
import { global } from "cdp";
/* tslint:disable:no-string-literal */
<%/ hasExports %>
<%# exportsList %>
import * as <% globalExport %> from "<% moduleName %>";
global["<% globalExport %>"] = <% globalExport %>;
<%/ exportsList %>
<%# hasExports %>
/* tslint:enable:no-string-literal */
<%/ hasExports %>

<%/ globals %>
import { Router as router } from "cdp/framework";
import { Theme } from "cdp/ui";
import "./view/loader";

const TAG: string = "[app] ";

function onStart(): void {
    // for dev. always show vertical scroll bar.
    Theme.detectUIPlatform();

    router.register("", "/templates/main.html", true);
    // start Router.
    router.start();
}

export { onStart as main };
