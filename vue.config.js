const hotHost = "localhost";
const hotPort = 8080;
const host = "http://localhost";
const port = 8000;

module.exports = {
  publicPath: "",
  devServer: {
    index: "index.html",
    host: hotHost,
    port: hotPort,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      "/api": {
        target: `${host}:${port}`,
        changeOrigin: true,
      },
    },
  },
};
