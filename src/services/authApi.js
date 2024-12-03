import {ACCESS_TOKEN,API_BASE_URL, request } from '../../../../Projet_Todolist/todolist_front/src/constants';



export function login(credentials) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        data: credentials,
    }).then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.data.token);

        return response.data.auth;
    });
};

export const register = async (userData) => {
    return request({
        url: API_BASE_URL + "/auth/register",
        method: 'POST',
        data: userData,
    });
};