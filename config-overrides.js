const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({ lessOptions: { javascriptEnabled: true, modifyVars: { '@primary-color': '#f96302' ,'input-placeholder-color': 'hsv(0, 0, 100%)','input-color': 'hsv(0, 0, 100%)','@error-color':'white'}, }, })
);