/* eslint "max-len": "off" */
import {allPass, complement, compose, either, is, isNil, not, test} from 'ramda'
import LocalizedStrings from 'react-localization'

export const isNotNil = complement(isNil)
export const isNotBlankString = compose(not, test(/^\s*$/))
export const isStringieThingie = allPass([isNotBlankString, either(is(Number), is(String)), isNotNil])
export const isValidEmail = test(/^[^\\.\\s@:][^\\s@:]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$/)
export const isValidPassword = test(/^([A-Z]|[a-z])([a-z]|[0-9]|[!@#$%^&*()[\];:,.<>?*^+=_-]){6,50}$/)

export default {
    passwordHelp: {
        email: [
            [isStringieThingie, new LocalizedStrings({
                en: {email: 'Please enter your email'},
                fr: {email: 'Entrez votre adresse e-mail'},
                es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
            }).email]
        ]
    },
    login: {
        password: [
            [isStringieThingie, new LocalizedStrings({
                en: {password: 'Please enter your password'},
                fr: {password: 's\'il vous plait entrez votre mot de passe'},
                es: {password: 'Por favor, introduzca su contraseña'}
            }).password]
        ],
        email: [
            [isStringieThingie, new LocalizedStrings({
                en: {email: 'Please enter your email'},
                fr: {email: 'Entrez votre adresse e-mail'},
                es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
            }).email]
        ]
    },
    applicationRegistration: {
        name: [
            [isStringieThingie, new LocalizedStrings({
                en: {name: 'Please enter your name'},
                fr: {name: 'S\'il vous plaît entrez votre nom'},
                es: {name: 'por favor, escriba su nombre'}
            }).name]
        ],
        redirect: [
            [isStringieThingie, new LocalizedStrings({
                en: {redirect: 'Please enter a URL'},
                fr: {redirect: 'Entrez une URL'},
                es: {redirect: 'Ingrese una URL'}
            }).redirect]
        ]
    },
    userRegistrationConfirmation: {
        password: [
            [isStringieThingie, new LocalizedStrings({
                en: {password: 'Please enter your password'},
                fr: {password: 's\'il vous plait entrez votre mot de passe'},
                es: {password: 'Por favor, introduzca su contraseña'}
            }).password],
            [isValidPassword, new LocalizedStrings({
                en: {password: 'Passwords should be greater than 6 alphanumeric characters. Some special characters are allowed.'},
                fr: {password: 'Les mots de passe doivent être supérieurs à 6 caractères. Algunos caracteres especiales están permitidos.'},
                es: {password: 'Las contraseñas deben tener más de 6 caracteres. Certains caractères spéciaux sont autorisés.'}
            }).password]
        ],
        confirm: [
            [isStringieThingie, new LocalizedStrings({
                en: {confirm: 'Please confirm your password'},
                fr: {confirm: 's\'il vous plait entrez votre mot de passe'},
                es: {confirm: 'Por favor, introduzca su contraseña'}
            }).confirm],
            [(conf, fields) => conf === fields.password, new LocalizedStrings({
                en: {confirm: 'Passwords do not match'},
                fr: {confirm: 'Les mots de passe ne correspondent pas'},
                es: {confirm: 'Las contraseñas no coinciden'}
            }).confirm]
        ]
    },
    userRegistration: {
        name: [
            [isStringieThingie, new LocalizedStrings({
                en: {name: 'Please enter your name'},
                fr: {name: 'S\'il vous plaît entrez votre nom'},
                es: {name: 'por favor, escriba su nombre'}
            }).name]
        ],
        email: [
            [isStringieThingie, new LocalizedStrings({
                en: {email: 'Please enter your email address'},
                fr: {email: 'Entrez votre adresse e-mail'},
                es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
            }).email],
            [isValidEmail, new LocalizedStrings({
                en: {email: 'Invalid email address'},
                fr: {email: 'Adresse e-mail invalide'},
                es: {email: 'Dirección de correo electrónico no válida'}
            }).email]
        ]
    }
}
