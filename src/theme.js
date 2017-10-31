import icons from './icons'

export const colors = {
    primary: {
        default: '#E10600',
        lt: '#F0887D',
        md: '#FF0700',
        dk: '#E10600'
    },
    secondary: {
        default: '#227FBB',
        lt: '#60AFFF',
        md: '#227FBB',
        dk: '#1B6595'
    },
    grayscale: {
        white: '#ebebeb',
        black: '#1E1E1E',
        lt: '#cacaca',
        md: '#464646',
        dk: '#333333'
    },
    status: {
        error: '#E10600',
        warning: '#FFF59D',
        ok: '#64DD17'
    }
}

export const fonts = {
    fontSize: '12px',
    fontFamily: 'Lato, Helvetica, sans-serif'
}

export const forms = {
    smallFormWidth: '325px',
    formItemMargin: '5px 15px'
}

export const breakpoints = {
    phone: 'screen and (min-width: 544px)',
    tablet: 'screen and (min-width: 768px)',
    desktop: 'screen and (min-width: 992px)',
    largeDesktop: 'screen and (min-width: 1200px)'
}

export default {
    colors,
    breakpoints,
    icons,
    fonts,
    forms
}
