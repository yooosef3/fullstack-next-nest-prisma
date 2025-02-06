const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
        modulesFromFile: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.node$/,
          use: 'node-loader',
        },
        {
          test: /\.(html|css)$/,
          use: 'ignore-loader',
        },
        {
          test: /.([cm]?ts|tsx)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ 
        name: options.output.filename,
        autoRestart: false,
        nodeArgs: ['--inspect=9229'] // Add debugging support
      }),
    ],
    node: {
      __dirname: false,
      __filename: false,
    },
    optimization: {
      runtimeChunk: false // Disable runtime chunk to prevent multiple instances
    }
  };
};
