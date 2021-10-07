import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";

const extensions = [".js", ".jsx", ".ts", ".tsx"]; // 어떤 확장자를 처리 할 지 정함

export default {
  input: "./src/main.ts",
  output: {
    file: "./dist/bundle.js",
    format: "es",
  },
  plugins: [json(), typescript(), resolve({ extensions })],
};
