import NodePath from 'path';
import RollupJson from '@rollup/plugin-json';
import RollupNodeResolve from '@rollup/plugin-node-resolve';
import RollupCommonjs from '@rollup/plugin-commonjs';
import RollupTypescript from 'rollup-plugin-typescript2';
// import { terser as Terser } from "rollup-plugin-terser";
import RollupClear from 'rollup-plugin-clear';
import RollupBabel from 'rollup-plugin-babel';
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

    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectories: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupJson(),
    RollupBabel({
      runtimeHelpers: true,
      presets: [
        [
          'taro',
          {
            framework: 'react',
          },
        ],
      ],
      plugins: ['@babel/plugin-transform-runtime'],
    }),

    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
    }),
    // Terser()
  ],
};
