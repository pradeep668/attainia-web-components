/* eslint "import/no-extraneous-dependencies": "off" */
const glob = require('glob-all')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const images = require('rollup-plugin-image')
const postcssConfig = require('./postcss.config')
const pkg = require('../package.json')

async function build() {
    try {
        const files = glob.sync(`${process.cwd()}/src/**/*.js`)
            .map(path => path.split('src/')[1].split('/'))
            .filter(([module, filename]) => module && filename)
            .map(([module, filename]) => ({module, filename}))

        await Promise.all(files.map(async ({module, filename}) => {
            const bundle = await rollup.rollup({
                input: `src/${module}/${filename}`,
                external: Object.keys(pkg.dependencies),
                plugins: [
                    images(),
                    postcss({plugins: postcssConfig.plugins}),
                    nodeResolve({
                        jsnext: true,
                        preferBuiltins: false,
                        browser: true
                    }),
                    commonjs(),
                    babel({
                        ...pkg.babel,
                        babelrc: false,
                        runtimeHelpers: true,
                        exclude: 'node_modules/**'
                    })
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
