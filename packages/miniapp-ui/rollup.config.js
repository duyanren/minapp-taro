import NodePath from 'path';
import RollupJson from '@rollup/plugin-json';
import RollupNodeResolve from '@rollup/plugin-node-resolve';
import RollupCommonjs from '@rollup/plugin-commonjs';
import RollupTypescript from 'rollup-plugin-typescript2';
import RollupCopy from 'rollup-plugin-copy';
import PostCss from 'rollup-plugin-postcss';
// import { terser as Terser } from "rollup-plugin-terser";
import RollupClear from 'rollup-plugin-clear';
// import RollupBabel from 'rollup-plugin-babel';
import postUrl from 'postcss-url';
import postImport from 'postcss-import';
import RollupImage from '@rollup/plugin-image';
import RollupAlias from '@rollup/plugin-alias';
import Package from './package.json';

const resolveFile = path => NodePath.resolve(__dirname, path);

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
];

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: false,
    },
  ],
  external: externalPackages,
  plugins: [
    RollupClear({
      targets: ['dist'], // 每次打包清空dist目录，重新生成
      watch: true,
    }),
    RollupAlias({
      entries: [{ find: '@', replacement: __dirname + '/src' }],
    }),
    PostCss({
      sourceMap: false,
      modules: true,
      // 样式合并到index文件 没有按需加载
      extract: `style/index.css`,
      plugins: [
        postImport(),
        postUrl({
          url: 'inline',
          maxSize: 70,
        }),
      ],
    }),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectories: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupJson(),
    // RollupBabel({
    //   runtimeHelpers: true,
    //   presets: [
    //     [
    //       'taro',
    //       {
    //         framework: 'react',
    //       },
    //     ],
    //   ],
    //   plugins: ['@babel/plugin-transform-runtime'],
    // }),

    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
    }),
    RollupImage({
      include: ['**/*.png', '**/*.jpg', '**/*.svg'],
    }),
    RollupCopy({
      // 按需加载的样式文件，直接放在styles文件夹下 名字和组件名保持一致
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('dist'),
        },
      ],
    }),
    // Terser()
  ],
};
