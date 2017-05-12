import { GeneratorBase, IProjectConfigration } from "../base";
import { GeneratorCordova } from "./generator-cordova";

export * from "./interfaces";
export * from "./generator-cordova";

/**
 * generator 生成関数
 */
export function newGeneratorMobile(config: IProjectConfigration): GeneratorBase {
    return new GeneratorCordova(config);
}
