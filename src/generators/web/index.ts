import { GeneratorBase, IProjectConfigration } from "../base";
import { GeneratorBrowser } from "./generator-browser";

export * from "./interfaces";
export * from "./generator-browser";

/**
 * generator 生成関数
 */
export function newGeneratorWeb(config: IProjectConfigration): GeneratorBase {
    return new GeneratorBrowser(config);
}
