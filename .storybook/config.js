import {configure} from '@storybook/react'

configure(() => {
    /* eslint "global-require": "off" */
    require('../.stories')
}, module)
