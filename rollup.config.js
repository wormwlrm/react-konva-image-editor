import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const rootDir = path.resolve(__dirname);

export default {
  input: './src/index.ts',
  output: [{
    file: './lib/bundle.js',
    format: 'es',
    sourcemap: true,
    globals: { react: 'React', 'react-dom': 'ReactDOM' },
  }, {
    file: './lib/bundle.min.js',
    format: 'es',
    globals: { react: 'React', 'react-dom': 'ReactDOM' },
    sourcemap: true,
    plugins: [
      terser(),
    ],
  }],
  external: ['react', 'react-dom'],

  plugins: [
    peerDepsExternal(),

    image(),

    // json 파일 로드
    json(),

    alias({
      entries: [
        { find: '@', replacement: path.resolve(rootDir, 'src') },
        { find: '@types', replacement: path.resolve(rootDir, '@types') },
      ],
    }),

    // 타입스크립트
    typescript(),

    // node_modules 에서 모듈을 불러올 수 있게 해줌
    // ts / tsx 파일도 불러올 수 있게 해줌
    resolve({ extensions, browser: true }),

    // cjs 기반 모듈 읽기
    commonjs({
      include: /node_modules/,
    }),

    // 노드 환경 변수 치환
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),

    // 바벨 트랜스파일러 설정
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    }),

    // 개발 서버
    serve({
      verbose: true,
      contentBase: ['', 'src', 'lib'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
    }),
  ],
};
