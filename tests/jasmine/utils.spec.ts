import {
    fs,
    $,
} from "../../built/utils/utils";

describe('check utils/libs instance', () => {

    it('fs-extra', () => {
        expect(fs).toBeDefined();
        expect(fs.copy).toBeDefined();
    });

    it('jQuery', () => {
        expect($).toBeDefined();
        expect($.Deferred).toBeDefined();
    });
});
