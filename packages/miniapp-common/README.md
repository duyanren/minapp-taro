# 使用

```javascript
// 安装npm包
yarn install @duyanren/miniapp-common
or npm i @duyanren/miniapp-common
// 按需加载

1. 安装babel-plugin-import插件  npm i babel-plugin-import -D
2. .babelrc配置文件中plugins增加配置

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

  ]

// 本地调试npm包

1. miniapp-common目录下 pnpm link --global
2. 切换到业务项目目录下 pnpm link --global @duyanren/miniapp-common
3. npm run dev:rollup


```
