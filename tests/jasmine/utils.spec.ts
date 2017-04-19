import {
    fs,
    glob,
    hogan,
    $,
    _,
    which,
    chalk,
    Spinner,
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
