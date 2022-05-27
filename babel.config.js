module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: ['@loadable/babel-plugin', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime'],
};
