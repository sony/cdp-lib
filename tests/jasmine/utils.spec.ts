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
    getSpinner,
    normalizeText,
    copyTpl,
    createGUID,
    str2XmlNode,
    formatXML,
} from "../../built/utils";

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

describe("check utils/tools", () => {
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

