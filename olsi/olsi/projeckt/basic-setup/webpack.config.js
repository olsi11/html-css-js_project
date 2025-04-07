const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path');

module.exports={
    
    entry:{
        index:"./src/index.js",
        about:"./src/about.js",
    },
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js',
        clean:true
    },
    module:{
        rules:[{
            test: /\.CSS$/,
            use:['style-loader', 'css-loader']
        },
        {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                targets: "defaults",
                presets: [
                  ['@babel/preset-env']
                ]
              }
            }
          }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template:'./src/about.html',
            filename:'about.html',
            chunks:['about']
        })
    ],
    devServer:{
        static:'dist',
        port:3001,
        open:true
    },
    mode:'development'
}
