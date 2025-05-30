module.exports = {
  plugins: [
    require('postcss-import')({
      path: ["src"],
    }),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};