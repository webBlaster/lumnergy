module.exports = function override(config, env) {
    if (!config.module) {
        config.module = {};
    }

    if (!config.module.rules) {
        config.module.rules = [];
    }

    config.module.rules.push({
        parser: {
            amd: false
        }
    });

    return config;
}
