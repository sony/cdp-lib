import * as Utils from "./utils";
export { Utils };

import {
    ISourceDirctoryConfigration,
    IBaseStructureConfigration,
    IProjectConfigration,
    IBuildTargetConfigration,
    ILibraryConfigration,
    IMobileAppConfigration,
    IDesktopAppConfigration,
    IWebAppConfigration,
    ////
    newGenerator
} from "./generators";

export {
    ISourceDirctoryConfigration,
    IBaseStructureConfigration,
    IProjectConfigration,
    IBuildTargetConfigration,
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

    ///////////////////////////////////////////////////////////////////////
    // pubic methods:

    /**
     * main command
     */
    public static execute(config: IProjectConfigration): Promise<void> {
        Utils.setSettings(config.settings);
        return newGenerator(config).run();
    }
}
