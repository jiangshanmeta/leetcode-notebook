/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1574316696997_2688';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {};
    exports.mongoose = {
        client: {
            url: 'mongodb://localhost:27017/leetcode-notebook',
            options: {
                useUnifiedTopology: true,
            },
        },
    };
    exports.security = {
        csrf: {
            enable: false,
        },
    };
    return {
        ...config,
        ...userConfig,
    };
};
