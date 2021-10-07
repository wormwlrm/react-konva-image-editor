import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input:
    process.env.NODE_ENV === "production"
      ? "./src/index.tsx"
      : "./src/components/index.ts",
  output: {
    file:
      process.env.NODE_ENV === "production"
        ? "./lib/bundle.js"
        : "./example/node_modules/konva-image-editor/lib/bundle.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    // json 파일 로드
    json(),

    // 타입스크립트
    typescript(),

    // node_modules 에서 모듈을 불러올 수 있게 해줌
    // ts / tsx 파일도 불러올 수 있게 해줌
    resolve({ extensions }),

    // cjs 기반 모듈 읽기
    commonjs({
      include: /node_modules/,
    }),

    // 노드 환경 변수 치환
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),

    // 바벨 트랜스파일러 설정
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    }),

    // HRM
    livereload(),

    // 개발 서버
    serve({
      verbose: true,
      contentBase: ["", "src", "lib"],
      historyApiFallback: true,
      host: "localhost",
      port: 3000,
    }),
  ],
  external: ["react", "react-dom"],
};
