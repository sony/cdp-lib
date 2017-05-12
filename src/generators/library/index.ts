import { GeneratorBase, IProjectConfigration } from "../base";
import { GeneratorModule } from "./generator-module";

export * from "./interfaces";
export * from "./generator-module";

/**
 * generator 生成関数
 */
export function newGeneratorLibrary(config: IProjectConfigration): GeneratorBase {
    return new GeneratorModule(config);
}
