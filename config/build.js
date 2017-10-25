/* eslint "import/no-extraneous-dependencies": "off" */
/* eslint "global-require": "off" */
const glob = require('glob-all')
const {rollup} = require('rollup')
const async = require('rollup-plugin-async')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const css = require('rollup-plugin-postcss')
const inject = require('rollup-plugin-inject')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const replace = require('rollup-plugin-replace')
const svg = require('rollup-plugin-svg')
const visualizer = require('rollup-plugin-visualizer')
const pkg = require('../package.json')

const isProduction = process.env.NODE_ENV === 'production'
const processShim = '\0process-shim'

async function build() {
    try {
        const files = glob.sync(`${process.cwd()}/src/components/**/*.js`)
            .map(path => path.split('src/components/')[1].split('/'))
            .filter(([module, filename]) => module && filename)
            .map(([module, filename, subfilename]) => ({module, filename, subfilename}))

        await Promise.all(files.map(async ({module, filename, subfilename}) => {
            const bundle = await rollup({
                input: `src/components/${module}/${filename}${subfilename ? `/${subfilename}` : ''}`,
                external: Object.keys(pkg.dependencies),
                globals: {react: 'React'},
                plugins: [
                    {
                        resolveId(imported) {
                            return imported === processShim ? imported : null
                        },
                        load(id) {
                            return id === processShim ? 'export default {argv: [], env: {}}' : null
                        }
                    },
                    svg(),
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
                    isProduction && replace({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    }),
                    isProduction && inject({
                        process: processShim
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
                            isProduction && require('babel-plugin-transform-react-remove-prop-types').default,
                            require('babel-plugin-external-helpers'),
                            require('babel-plugin-transform-object-rest-spread'),
                            require('babel-plugin-syntax-async-functions'),
                            Object.assign(require('babel-plugin-transform-runtime'), {polyfill: true})
                        ].filter(Boolean)
                    }),
                    visualizer()
                ].filter(Boolean)
            })

            return bundle.write({
                format: 'es', // umd || cjs
                sourcemap: true,
                file: `${module}/${filename}${subfilename ? `/${subfilename}` : ''}`
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
