const path = require( 'path' );
const logging = require( 'webpack/lib/logging/runtime' );
const logger = logging.getLogger( 'wps' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ESLintPlugin = require( 'eslint-webpack-plugin' );

const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';

const paths = {
    src: path.resolve( __dirname, 'src' ),
    build: path.resolve( __dirname, 'build' ),
};

logger.info( `Mode: ${ mode }` );

const config = {
    mode,
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].ts',
        path: paths.build,
        publicPath: '/',
    },
    stats: {
        assets: true,
        modules: false,
    },
    target: 'web',
    devtool: isDev
        ? 'eval-cheap-module-source-map'
        : 'none',
    devServer: {
        publicPath: '/',
        writeToDisk: true,
        overlay: {
            errors: true,
            warnings: true,
        },
        stats: 'errors-only',
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 1%, last 2 versions, not dead',
                                    useBuiltIns: 'usage',
                                    loose: true,
                                    corejs: 3,
                                },
                            ],
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            'babel-plugin-transform-typescript-metadata',
                            [ '@babel/plugin-proposal-decorators', { legacy: true } ],
                            [ '@babel/plugin-proposal-class-properties', { loose: true } ],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin( {
            emitWarning: true,
        } ),
    ],
    resolve: {
        alias: {
            '@': paths.src,
        },
    },
};

module.exports = config;