import axios from 'axios';
import types from './types';
import constants from './constants';

const {API_URL} = constants;

export const passwordHelp = dispatch =>
    async ({email}) => {
        const {data} = await axios.post(`${API_URL}/password-help/`, {email});

        dispatch({data, type: types.PASSWORD_HELP});
    };

export const register = dispatch =>
    async ({name, email, password}) => {
        const {data} = await axios.post(`${API_URL}/register/`, {name, email, password});

        dispatch({data, type: types.REGISTER});
    };

export const registerApplication = dispatch =>
    async ({name, redirect}) => {
        const {data} = await axios.post(`${API_URL}/applications/`, {
            name,
            redirect_uris: redirect,
            authorization_grant_type: 'authorization-code',
            client_type: 'public',
            skip_authorization: true
        });

        dispatch({data, type: types.REGISTER_APP});
    };

export const login = dispatch =>
    async ({email, password}, callback) => {
        const {data} = await axios.post(`${API_URL}/oauth/token/`, {
            password,
            grant_type: 'password',
            username: email.split('@')[0]
        });

        dispatch({data, type: types.LOGIN});

        if (callback) callback();
    };

export const logout = dispatch =>
    async () => {
        const {data} = await axios.post(`${API_URL}/logout/`);

        dispatch({data, type: types.LOGOUT});
    };

