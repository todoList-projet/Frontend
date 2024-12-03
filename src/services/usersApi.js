import { ACCESS_TOKEN,API_BASE_URL , request } from '../../../../Projet_Todolist/todolist_front/src/constants';


const checkAccessToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return Promise.reject("No access token set.");
    }
}

export const getAllUsers = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/users`,
        method: 'GET',
    });
}

export const getUserById = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/users/me`,
        method: 'GET',
    });
}

export const updateProfile = async (data) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/users`,
        method: 'PUT',
        data : data,
    });
}