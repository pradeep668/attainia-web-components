import axios from 'axios';
import types from './types';
import constants from './constants';

const {API_URL} = constants;

const ax = axios.create({baseURL: `${API_URL}/`});

export const passwordHelp = dispatch =>
    async ({email}) => {
        const {data} = await ax({
            url: '/password-help/',
            method: 'post',
            data: {email}
        });

        dispatch({data, type: types.PASSWORD_HELP});
    };

export const register = dispatch =>
    async ({name, email, password}) => {
        const {data} = await ax({
            url: '/register/',
            method: 'post',
            data: {name, email, password}
        });

        dispatch({data, type: types.REGISTER});
    };

export const registerApplication = dispatch =>
    async ({name, redirect, token}) => {
        const {data} = await ax({
            url: '/applications/',
            method: 'post',
            headers: {
                Auth: `Bearer ${token}`
            },
            data: {
                name,
                redirect_uris: redirect,
                authorization_grant_type: 'authorization-code',
                client_type: 'public',
                skip_authorization: true
            }
        });

        dispatch({data, type: types.REGISTER_APP});
    };

export const login = dispatch =>
    async ({email, password}, callback) => {
        const {data} = await ax({
            url: '/login',
            method: 'post',
            data: {
                password,
                username: email.split('@')[0]
            }
        });

        dispatch({data, type: types.LOGIN});

        if (callback) callback();
    };

export const logout = dispatch =>
    async ({token}) => {
        const {data} = await ax({
            url: '/logout/',
            method: 'post',
            headers: {
                Auth: `Bearer ${token}`
            }
        });

        dispatch({data, type: types.LOGOUT});
    };

