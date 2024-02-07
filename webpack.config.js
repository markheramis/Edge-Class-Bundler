const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node', // Set the target to Node.js environment
    entry: './main.js', // Replace with your main entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'EdgeClass',
            type: 'this',
        },
    },
    optimization: {
        innerGraph: true,
        minimize: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        mangleExports: true,
        usedExports: true,
        concatenateModules: true,
        mergeDuplicateChunks: false,
    },
    performance: {
        hints: 'error',
    },
};
