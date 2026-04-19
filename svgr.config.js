/** @type {import('@svgr/core').Config} */
export default {
  typescript: true,
  jsxRuntime: "automatic",
  ref: true,
  titleProp: true,
  descProp: true,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeTitle: false,
            removeDesc: false,
            sortAttrs: true,
            removeOffCanvasPaths: true,
          },
        },
      },
    ],
  },
};
