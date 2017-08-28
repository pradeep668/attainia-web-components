/* eslint "max-len": "off" */

import LocalizedStrings from 'react-localization';

const PASSWORD_PATTERN = new RegExp(/^([A-Z]|[a-z])([a-z]|[0-9]|[!@#$%^&*()[\];:,.<>?*^+=_-]){6,50}$/);

export default {
    PASSWORD_PATTERN,
    API_URL: process.env.REACT_APP_AUTH_API_BASE_URL || 'http://localhost',
    passwordHelp: {
        messages: new LocalizedStrings({
            en: {
                'required.email': 'Please enter your email'
            },
            fr: {
                'required.email': 'Entrez votre adresse e-mail'
            },
            es: {
                'required.email': 'Por favor, introduzca su dirección de correo electrónico'
            }
        }),
        rules: {
            email: 'required'
        }
    },
    login: {
        messages: new LocalizedStrings({
            en: {
                'required.email': 'Please enter your email',
                'required.password': 'Please enter your password'
            },
            fr: {
                'required.email': 'Entrez votre adresse e-mail',
                'required.password': 's\'il vous plait entrez votre mot de passe'
            },
            es: {
                'required.email': 'Por favor, introduzca su dirección de correo electrónico',
                'required.password': 'Por favor, introduzca su contraseña'
            }
        }),
        rules: {
            email: 'required',
            password: 'required'
        }
    },
    registerApplication: {
        messages: new LocalizedStrings({
            en: {
                'required.name': 'Please enter your name',
                'required.redirect': 'Please enter a URL'
            },
            fr: {
                'required.name': 'S\'il vous plaît entrez votre nom',
                'required.redirect': 'Entrez une URL'
            },
            es: {
                'required.name': 'por favor, escriba su nombre',
                'required.redirect': 'Ingrese una URL'
            }
        }),
        rules: {
            name: 'required',
            redirect: 'required'
        }
    },
    register: {
        messages: new LocalizedStrings({
            en: {
                'required.name': 'Please enter your name',
                'required.email': 'Please enter your email address',
                'email.email': 'Invalid email address',
                'required.password': 'Please enter your password',
                'regex.password': 'Passwords should be greater than 6 alphanumeric characters. Some special characters are allowed.'
            },
            fr: {
                'required.name': 'S\'il vous plaît entrez votre nom',
                'required.email': 'Entrez votre adresse e-mail',
                'email.email': 'Adresse e-mail invalide',
                'required.password': 's\'il vous plait entrez votre mot de passe',
                'regex.password': 'Les mots de passe doivent être supérieurs à 6 caractères. Algunos caracteres especiales están permitidos.'
            },
            es: {
                'required.name': 'por favor, escriba su nombre',
                'required.email': 'Por favor, introduzca su dirección de correo electrónico',
                'email.email': 'Dirección de correo electrónico no válida',
                'required.password': 'Por favor, introduzca su contraseña',
                'regex.password': 'Las contraseñas deben tener más de 6 caracteres. Certains caractères spéciaux sont autorisés.'
            }
        }),
        rules: {
            name: 'required',
            password: ['required', `regex:${PASSWORD_PATTERN}`],
            email: 'required|email'
        }
    }
};
