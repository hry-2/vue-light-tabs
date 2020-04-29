import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
export default {
  input: "src/index.js",
  output: {
    name: 'LightTabs',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ]
};