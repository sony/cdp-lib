import * as path from "path";

import {
    fs,
    glob,
    hogan,
    $,
    _,
    which,
    uuid,
    chalk,
    Spinner,
    ////
    getSettings,
    setSettings,
    getLibPath,
    log,
    debug,
    assert,
    ////
    handleError,
    getSpinner,
    normalizeText,
    copyTpl,
    createGUID,
    str2XmlNode,
    formatXML,
} from "../../built/utils/index";

var org = {
    force: false,
    verbose: false,
    silent: false,
    libPath: 'D:\Projects\CDP\DevBoilerplate\cdp-lib\node_modules\cdp-lib'
};

var hoge = {
    force: false,
    verbose: false,
    silent: false,
    libPath: 'D:\Projects\CDP\DevBoilerplate\cdp-lib\node_modules\cdp-lib'
};

describe("check utils/libs instance", () => {

    it("fs-extra", () => {
        expect(fs).toBeDefined();
        expect(fs.copy).toBeDefined();
    });

    it("glob", () => {
        expect(glob).toBeDefined();
        expect(glob.sync).toBeDefined();
    });

    it("hogan", () => {
        expect(hogan).toBeDefined();
        expect(hogan.compile).toBeDefined();
    });

    it("jQuery", () => {
        expect($).toBeDefined();
        expect($.Deferred).toBeDefined();
    });

    it("underscore.string", () => {
        expect(_).toBeDefined();
        expect(_.mixin).toBeDefined();      // underscore (lodash)
        expect(_.camelize).toBeDefined();   // underscore.string
    });

    it("which", () => {
        expect(which).toBeDefined();
        expect("function" === typeof which).toBeTruthy();
    });

    it("uuid", () => {
        expect(uuid).toBeDefined();
        expect(uuid.v1).toBeDefined();
        expect("function" === typeof uuid.v1).toBeTruthy();
    });

    it("chalk", () => {
        expect(chalk).toBeDefined();
        expect(chalk.red).toBeDefined();
        expect("function" === typeof chalk.red).toBeTruthy();
    });

    it("cli-spinner", () => {
        expect(Spinner).toBeDefined();
        expect("function" === typeof Spinner).toBeTruthy();
    });
});

describe("check utils/settings", () => {
    afterEach(() => {
        setSettings(null);
    });

    it("getSettings", () => {
        expect(getSettings).toBeDefined();
        let settings = getSettings();
        expect(settings).toEqual({
            force: false,
            verbose: false,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });

        settings.force = true;
        settings.libPath = "hoge";

        expect(getSettings()).not.toEqual({
            force: true,
            verbose: false,
            silent: false,
            libPath: "hoge",
        });
        expect(getSettings()).toEqual({
            force: false,
            verbose: false,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });
    });

    it("setSettings", () => {
        expect(setSettings).toBeDefined();
        setSettings({
            force: true,
        });
        expect(getSettings()).toEqual({
            force: true,
            verbose: false,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });
        setSettings({
            verbose: true,
        });
        expect(getSettings()).toEqual({
            force: true,
            verbose: true,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });
        setSettings({
            silent: true,
        });
        expect(getSettings()).toEqual({
            force: true,
            verbose: true,
            silent: true,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });
        setSettings({
            libPath: "hoge",
        });
        expect(getSettings()).toEqual({
            force: true,
            verbose: true,
            silent: true,
            libPath: "hoge",
        });
        setSettings(null);
        expect(getSettings()).toEqual({
            force: false,
            verbose: false,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
        });
    });

    it("getLibPath", () => {
        expect(getLibPath).toBeDefined();
        expect(getLibPath()).toEqual(path.join(process.cwd(), "node_modules", "cdp-lib"));
        setSettings({
            libPath: "hoge",
        });
        expect(getLibPath()).toEqual("hoge");
    });

    it("log", () => {
        spyOn(console, "log").and.callFake((message: string, ...optionalParams: any[]) => {
            expect(message).toEqual("TEST");
            if (optionalParams && 0 < optionalParams.length) {
                expect(optionalParams[0][0].hoge).toEqual("TEST");
            }
        });
        expect(log).toBeDefined();
        log("TEST");
        log("TEST", { hoge: "TEST" });
        setSettings({ silent: true });
        log("Doesn't call");
    });

    it("debug", () => {
        spyOn(console, "error").and.callFake((message: string, ...optionalParams: any[]) => {
            expect(message).toEqual("DEBUG: TEST");
            if (optionalParams && 0 < optionalParams.length) {
                expect(optionalParams[0][0].hoge).toEqual("TEST");
            }
        });
        expect(debug).toBeDefined();
        debug("Doesn't call");
        debug("Doesn't call", { hoge: "TEST" });
        setSettings({ verbose: true });
        debug("TEST");
        debug("TEST", { hoge: "TEST" });
        setSettings({ silent: true });
        debug("Doesn't call");
        debug("Doesn't call", { hoge: "TEST" });
    });

    it("assert", () => {
        spyOn(console, "warn").and.callFake((message: string, ...optionalParams: any[]) => {
            expect(message).toEqual("TEST(force)");
            if (optionalParams && 0 < optionalParams.length) {
                expect(optionalParams[0][0].hoge).toEqual("TEST");
            }
        });
        spyOn(console, "error").and.callFake((message: string, ...optionalParams: any[]) => {
            expect(message).toEqual("TEST(exit)");
            if (optionalParams && 0 < optionalParams.length) {
                expect(optionalParams[0][0].hoge).toEqual("TEST");
            }
        });
        spyOn(process, "exit").and.stub();

        expect(assert).toBeDefined();
        assert(true, "Doesn't call");
        assert(true, "Doesn't call", { hoge: "TEST" });

        assert(false, "TEST(exit)");
        assert(false, "TEST(exit)", { hoge: "TEST" });

        setSettings({ force: true });
        assert(false, "TEST(force)");
        assert(false, "TEST(force)", { hoge: "TEST" });
    });
});

describe("check utils/tools", () => {

    it("handleError", () => {
        expect(handleError).toBeDefined();
        expect("function" === typeof handleError).toBeTruthy();
        spyOn(process, "exit").and.callFake((value: number) => {
            expect(value).toEqual(1);
        });
        handleError("TEST: Error Call");
    });

    it("getSpinner", () => {
        expect(getSpinner).toBeDefined();
        expect("function" === typeof getSpinner).toBeTruthy();
        let spinner = getSpinner();
        expect(spinner).toBeDefined();
        expect("function" === typeof spinner.start).toBeTruthy();
        expect("function" === typeof spinner.stop).toBeTruthy();
    });

    it("normalizeText", () => {
        expect(normalizeText).toBeDefined();
        expect("function" === typeof normalizeText).toBeTruthy();

        let src = "hogehoge\n";
        expect(normalizeText(src, {
            eol: "\r\n",
            bom: false,
        })).toBe("hogehoge" + "\r\n");

        expect(normalizeText(src, {
            eol: "\n",
            bom: true,
        })).toBe("\ufeff" + "hogehoge" + "\n");

        expect(normalizeText("hoge\thoge", {
            tab: 4
        })).toBe("\ufeff" + "hoge    hoge");
    });

    it("copyTpl", () => {
        expect(copyTpl).toBeDefined();
        expect("function" === typeof copyTpl).toBeTruthy();
    });

    it("createGUID", () => {
        expect(createGUID).toBeDefined();
        expect("function" === typeof createGUID).toBeTruthy();
        let guid = createGUID();
        expect(guid.indexOf("{")).toBeGreaterThan(-1);
        expect(guid.indexOf("}")).toBeGreaterThan(0);
        expect(guid.length).toEqual(38);
    });

    it("str2XmlNode", () => {
        expect(str2XmlNode).toBeDefined();
        expect("function" === typeof str2XmlNode).toBeTruthy();

        let $preference = str2XmlNode(`<preference name="DisallowOverscroll" value="true"/>`);
        expect($preference.attr("name")).toEqual("DisallowOverscroll");
        expect($preference.attr("value")).toEqual("true");
    });

    it("formatXML", () => {
        expect(formatXML).toBeDefined();
        expect("function" === typeof formatXML).toBeTruthy();

        let input =
`<?xml version='1.0' encoding='utf-8'?>
<widget id="com.sony.cdp.test">
    <preference name="DisallowOverscroll" value="true"/>
    <description>
        TEST
    </description>
</widget>
`;
        let output =
`<?xml version='1.0' encoding='utf-8'?>
<widget id="com.sony.cdp.test">
  <preference name="DisallowOverscroll" value="true"/>
  <description>
    TEST
  </description>
</widget>
`;
        output = normalizeText(output, { bom: true, eol: "\n" });
        expect(formatXML(input, { eol: "\n" })).toEqual(output);
    });
});

