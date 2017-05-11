import * as Utils from "./utils";
export { Utils };

import {
    ISourceDirctoryConfigration,
    IBaseStructureConfigration,
    IProjectConfigration,
    ICompileConfigration,
    ILibraryConfigration,
    IMobileAppConfigration,
    IDesktopAppConfigration,
    IWebAppConfigration,
} from "./generators";

export {
    ISourceDirctoryConfigration,
    IBaseStructureConfigration,
    IProjectConfigration,
    ICompileConfigration,
    ILibraryConfigration,
    IMobileAppConfigration,
    IDesktopAppConfigration,
    IWebAppConfigration,
};

//___________________________________________________________________________________________________________________//

/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
export default class CDPLib {
    /**
     * main command
     */
    public static execute(options: IProjectConfigration): void {
        Utils.setSettings(options.settings);
        console.log(JSON.stringify(options, null, 4));
    }
}
