/* eslint "import/no-extraneous-dependencies": "off" */
/* eslint "global-require": "off" */
const glob = require('glob-all')
const {rollup} = require('rollup')
const async = require('rollup-plugin-async')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const css = require('rollup-plugin-postcss')
const nodeResolve = require('rollup-plugin-node-resolve')
const images = require('rollup-plugin-image')
const json = require('rollup-plugin-json')
const uglify = require('rollup-plugin-uglify')
const visualizer = require('rollup-plugin-visualizer')
const {minify} = require('uglify-es')
const pkg = require('../package.json')

async function build() {
    try {
        const files = glob.sync(`${process.cwd()}/src/components/**/*.js`)
            .map(path => path.split('src/components/')[1].split('/'))
            .filter(([module, filename]) => module && filename)
            .map(([module, filename]) => ({module, filename}))

        await Promise.all(files.map(async ({module, filename}) => {
            const bundle = await rollup({
                input: `src/components/${module}/${filename}`,
                external: Object.keys(pkg.dependencies),
                plugins: [
                    images(),
                    json(),
                    css(),
                    nodeResolve({
                        jsnext: true,
                        preferBuiltins: false,
                        browser: true
                    }),
                    commonjs({
                        ignoreGlobal: true
                    }),
                    async(),
                    babel({
                        babelrc: false,
                        exclude: 'node_modules/**',
                        runtimeHelpers: true,
                        presets: [
                            require('babel-preset-es2015-rollup'),
                            require('babel-preset-react')
                        ],
                        plugins: [
                            require('babel-plugin-external-helpers'),
                            require('babel-plugin-syntax-async-functions'),
                            require('babel-plugin-transform-object-rest-spread'),
                            Object.assign(require('babel-plugin-transform-runtime'), {polyfill: false})
                        ]
                    }),
                    uglify({}, minify),
                    visualizer()
                ]
            })

            return bundle.write({
                format: 'es', // umd || cjs
                sourcemap: true,
                file: `${module}/${filename}`
            })
        }))
        process.exit(0)
    } catch (e) {
        /* eslint "no-console": "off" */
        console.error(e)
        process.exit(1)
    }
}

build()
