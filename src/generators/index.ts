import { assert } from "../utils/settings";

import { GeneratorBase, IProjectConfigration } from "./base";
import { newGeneratorLibrary } from "./library";
import { newGeneratorMobile } from "./mobile";
import { newGeneratorDesktop } from "./desktop";
import { newGeneratorWeb } from "./web";

export * from "./base";
export * from "./library";
export * from "./mobile";
export * from "./desktop";
export * from "./web";

/**
 * generator 生成関数
 */
export function newGenerator(config: IProjectConfigration): GeneratorBase {
    switch (config.projectType) {
        case "library":
            return newGeneratorLibrary(config);
        case "mobile":
            return newGeneratorMobile(config);
        case "desktop":
            return newGeneratorDesktop(config);
        case "web":
            return newGeneratorWeb(config);
        default:
            assert(false, "unsupported project kind: " + config.projectType);
            return null;
    }
}
