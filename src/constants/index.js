import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3005';
export const ACCESS_TOKEN = 'token';

export const request = (options) => {

    let aut = "";
    if (localStorage.getItem(ACCESS_TOKEN)) {
        aut = localStorage.getItem(ACCESS_TOKEN);
    }

    //let token = localStorage.getItem(ACCESS_TOKEN) || '';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+aut,
        "Cache-Control": "no-store, no-cache"
    };
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return axios(options);
};