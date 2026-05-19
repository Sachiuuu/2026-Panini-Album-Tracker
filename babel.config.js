module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Metro doesn't transform import.meta (a Vite/ESBuild idiom).
      // Zustand's devtools middleware uses `import.meta.env?.MODE` which throws
      // a SyntaxError in non-module scripts. Replace it with process.env.NODE_ENV.
      function importMetaEnvPlugin() {
        return {
          visitor: {
            MetaProperty(path) {
              if (
                path.node.meta.name === 'import' &&
                path.node.property.name === 'meta'
              ) {
                path.replaceWithSourceString('({ env: { MODE: process.env.NODE_ENV } })');
              }
            },
          },
        };
      },
    ],
  };
};
