# postcss-px-to-viewport



1. 安装

   ```bash
   npm i postcss-px-to-viewport postcss-loader --save-dev
   ```

2. 配置 `webpack.config.js`

   ```js
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   const Postcss = require('postcss')
   const PostcssPxToViewport = require('postcss-px-to-viewport');
   
   module.exports = {
     module: {
       rules: [
         ...
         {
           test: /\.(?:sass|scss)$/,
           use: [
             MiniCssExtractPlugin.loader,
             {
               loader: 'css-loader',
               options: {
                 sourceMap: true,
                 modules: {
                   localIdentName: '[name]__[local]__[hash:base64:5]',
                   exportLocalsConvention: 'camelCase',
                 },
               },
             },
             {
               loader: 'postcss-loader',
               options: {
                 postcssOptions: {
                   plugins: [
                     PostcssPxToViewport({
                       unitToConvert: 'px',
                       viewportWidth: 1920,
                       unitPrecision: 5,
                       propList: ['*'],
                       viewportUnit: 'vw',
                       fontViewportUnit: 'vw',
                       selectorBlackList: [],
                       minPixelValue: 1,
                       mediaQuery: false,
                       replace: true,
                       exclude: /(\/|\\)(node_modules)(\/|\\)/,
                       landscape: false,
                       landscapeUnit: 'vw',
                       landscapeWidth: 568
                     })
                   ]
                 }
               }
             }
           ]
         }
       ]
     }
   }
   ```

   