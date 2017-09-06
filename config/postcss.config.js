/* eslint "global-require": "off" */
/* eslint "import/no-extraneous-dependencies": "off" */
module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nesting'),
        require('postcss-custom-media'),
        require('postcss-cssnext')({
            browsers: ['last 2 versions', '> 5%']
        })
    ]
}
