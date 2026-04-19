module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false, // https://github.com/svg/svgo/issues/1128
          removeTitle: false,
          removeDesc: false,
          sortAttrs: true,
          removeOffCanvasPaths: true,
        },
      },
    },
  ],
};
