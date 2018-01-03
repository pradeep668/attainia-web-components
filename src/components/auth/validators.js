/* eslint "max-len": "off" */
import {compose, pickBy, reduce, not, allPass, either} from 'ramda'
import {isNotNil, isString, isNumber} from 'ramda-adjunct'
import LocalizedStrings from 'react-localization'
import spected from 'spected'

export const isNotBlankString = s => not(/^\s*$/.test(s))
export const isStringieThingie = allPass([isNotBlankString, either(isNumber, isString), isNotNil])
export const isValidEmail = s => /^[^\\.\\s@:][^\\s@:]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$/.test(s)
export const isValidPassword = s => /^([A-Z]|[a-z])([a-z]|[0-9]|[!@#$%^&*()[\];:,.<>?*^+=_-]){6,50}$/.test(s)
export const createValidator = rules => {
    const fields = Object.keys(rules)
    return compose(
        pickBy(val => val !== true),
        values => spected(rules, {
            ...reduce((obj, key) => ({...obj, [key]: ''}), {}, fields),
            ...values
        })
    )
}

export default {
    passwordHelp: {
        validate: createValidator({
            email: [
                [isStringieThingie, new LocalizedStrings({
                    en: {email: 'Please enter your email'},
                    fr: {email: 'Entrez votre adresse e-mail'},
                    es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                }).email]
            ]
        })
    },
    login: {
        validate: createValidator({
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
        })
    },
    applicationRegistration: {
        validate: createValidator({
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
        })
    },
    userRegistrationConfirmation: {
        validate: createValidator({
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
        })
    },
    userRegistration: {
        validate: createValidator({
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
        })
    }
}
