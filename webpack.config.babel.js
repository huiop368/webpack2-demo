import path     from 'path'
import merge    from 'webpack-merge'
import webpack  from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const env = process.env.NODE_ENV || 'development'

let config = {}

const common = {
    entry : {
       'bundle' :'./src/main.js'
    },
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, 'dist'),
        sourceMapFilename: '[file].map'
    },

    resolve : {
        alias : {
            'components' : path.resolve(__dirname, 'src/components')
        }
    },

    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : ['babel-loader']
            },
            
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, 'index.html')
        })         
    ]
}

if(env === 'development'){
    config = merge(common, {
        module : {
            rules : [
                {
                    test : /\.less$/,
                    exclude : /node_modules/,
                    use : ['style-loader', 'css-loader', 'less-loader']
                }
            ]
        },
        devtool: "cheap-eval-source-map",
        devServer: {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          port: 9000
        }
    })
}

if(env === 'production'){
    config = merge(common, {
        output : {
            filename : '[name].[chunkhash].js',
            path : path.resolve(__dirname, 'dist'),
            sourceMapFilename: '[file].map',
            publicPath : '/'
        },
        module : {
            rules : [
                {
                    test : /\.less$/,
                    exclude : /node_modules/,
                    use : ExtractTextPlugin.extract({
                        fallback : 'style-loader',  
                        use : ['css-loader', 'less-loader'] 
                    })
                }
            ]
        },
        devtool: "source-map",
        plugins : [
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap : true,
                compress: {
                  warnings: false,
                  drop_console: false,
                }
            }),
            new ExtractTextPlugin('[name].[chunkhash].css')
        ]
    })
}

export default config
