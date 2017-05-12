import { GeneratorBase, IProjectConfigration } from "../base";
import { GeneratorElectron } from "./generator-electoron";

export * from "./interfaces";
export * from "./generator-electoron";

/**
 * generator 生成関数
 */
export function newGeneratorDesktop(config: IProjectConfigration): GeneratorBase {
    return new GeneratorElectron(config);
}
