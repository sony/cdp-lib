/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as Base from "../../built/generators/base";
import * as Library from "../../built/generators/library";

describe("check definition", () => {
    let instance: any;
    beforeEach(() => {
        instance = new Library.GeneratorModule({
            projectName: "test",
            projectType: "library",
            action: "create",
            version: "1.0.0",
            license: "Apache-2.0",
            settings: null,
        });
    });
    afterEach(() => {
        instance = null;
    });

    it("constructor", () => {
        expect(Base.GeneratorBase).toBeDefined();
    });

    it("getNodeModuleLatestVersion", (done) => {
        expect(instance).toBeDefined();
        async function check(): Promise<void> {
            const version = await instance.queryNodeModuleLatestVersion("fs-extra");
            expect("string" === typeof version).toBeTruthy();
            expect(Base.Utils.semverRegex().test(version)).toBeTruthy();
            done();
        }
        check();
    });
});
