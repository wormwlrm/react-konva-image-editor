import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  {
    input: "./src/index.js",
    output: {
      file: "./build/bundle.js",
      format: "iife",
    },
    plugins: [
      // node_modules 에서 모듈을 불러올 수 있게 해줌
      // ts / tsx 파일도 불러올 수 있게 해줌
      resolve({ extensions }),

      // cjs 기반 모듈 읽기
      commonjs({
        include: /node_modules/,
      }),

      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),

      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),

      // HRM
      livereload(),

      serve({
        verbose: true,
        contentBase: ["", "src", "build"],
        historyApiFallback: true,
        host: "localhost",
        port: 3030,
      }),
    ],
    // external: ["react", "react-dom"],
  },
];
