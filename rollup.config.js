import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    file: './dist/use-routes.js',
    format: 'umd',
    name: 'use-routes'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['@babel/preset-react']],
    })
  ]
}