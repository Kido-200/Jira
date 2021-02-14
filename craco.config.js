const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "rgb(0,82,204)",
          "@font-size-base": "16px",
        },
      },
    },
  ],
};
