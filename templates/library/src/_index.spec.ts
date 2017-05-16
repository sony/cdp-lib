import <% sampleClass %> from "../../<% built %>/<% sampleModule %>";

describe("test sample", () => {
    beforeEach(() => {
        // TODO:
    });
    afterEach(() => {
        // TODO:
    });

    it("cool method", () => {
        expect(<% sampleClass %>.coolMethod("World.")).toBe("Hello cool World.");
    });

    it("async template", (done) => {
        setTimeout(() => {
            expect(<% sampleClass %>.coolMethod("async test.")).toBe("Hello cool async test.");
            done();
        });
    });
});
