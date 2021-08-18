// import { createGlobalStyle, DefaultTheme } from 'styled-components'
import { fontConfiguration } from '../../website-config'

const appPrimaryColor = 'rgb(219, 13, 48)'
const appPrimaryDarkColor = '#BB2A38'
const appSecondaryColor = '#662E9B'
const appTerziaryColor = '#f5b042'
const appFourthColor = '#20e378'
const appFifthColor = '#b5099b'
const appYellow = '#fcca4c'
const yellowDark = '#f5b71b'
const grey = '#525252'

const appBlue = '#4287f5'
const appGreen = '#42f584'

// const classicPalette: LinariaTheme = {
//     borderRadius: '5px',

//     colors: {
//         primary: appPrimaryColor,
//         primaryDark: appPrimaryDarkColor,
//         secondary: appSecondaryColor,
//         terziary: appTerziaryColor,
//         fourth: appFourthColor,
//         fifth: appFifthColor,
//         yellow: appYellow,
//         yellowDark: yellowDark,
//         background: '#212121',
//         backgroundDark: '#262626',
//         grey: grey,
//     },

//     text: {
//         primaryFont: fontConfiguration.fontName,
//         secondaryFont: 'Kanit',
//         color: '#0b0521',
//         headerTextColor: '#62707c',
//     },

//     brand: {
//         icon: '/icons/app_icon.svg',
//     },
// }

const darkPalette: LinariaTheme = {
    borderRadius: '5px',

    colors: {
        primary: '#2bbbff',
        primaryDark: '#d91139',
        secondary: appSecondaryColor,
        terziary: appTerziaryColor,
        fourth: appFourthColor,
        fifth: appFifthColor,
        yellow: appYellow,
        yellowDark: yellowDark,
        background: '#212121',
        backgroundDark: '#1c1c1c',
        grey: grey,
        blue: appBlue,
        green: appGreen,
    },

    text: {
        primaryFont: fontConfiguration.fontName,
        secondaryFont: 'Kanit',
        color: 'white',
        headerTextColor: '#62707c',
    },

    brand: {
        icon: '/icons/app_icon.svg',
    },
}

export interface LinariaTheme {
    borderRadius: '5px'

    colors: {
        primary: string
        primaryDark: string
        secondary: string
        terziary: string
        fourth: string
        fifth: string
        yellow: string
        yellowDark: string
        background: '#212121'
        backgroundDark: string
        grey: string
        blue: string
        green: string
    }

    text: {
        primaryFont: string
        secondaryFont: 'Kanit'
        color: string
        headerTextColor: string
    }

    brand: {
        icon: '/icons/app_icon.svg'
    }
}

export const linariaTheme: LinariaTheme = darkPalette
