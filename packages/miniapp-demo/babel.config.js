// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@duyanren/miniapp-common',
        camel2DashComponentName: false,
        customName: (name = '') => {
          if (name.padStart('use')) {
            return `@duyanren/miniapp-common/lib/hooks/${name}`;
          }

          return `@duyanren/miniapp-common/lib/utils/${name}`;
        },
      },
      '@duyanren/miniapp-common',
    ],
    // [
    //   'import',
    //   {
    //     libraryName: '@duyanren/miniapp-ui',
    //     camel2DashComponentName: false,
    //     customName: name => {
    //       return `@duyanren/miniapp-ui/lib/components/${name}`;
    //     },
    //     customStyleName: name =>
    //       `@duyanren/miniapp-ui/dist/style/${name.toLocaleLowerCase()}.scss`,
    //   },
    //   '@duyanren/miniapp-ui',
    // ],
  ],
};
