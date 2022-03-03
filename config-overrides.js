const { override, addPostcssPlugins, addLessLoader } = require('customize-cra');
module.exports = override(
    addPostcssPlugins([require('postcss-px2rem')({ remUnit: 375 / 10 })]),
    addLessLoader()
);
