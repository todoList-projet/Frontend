
import { ACCESS_TOKEN,API_BASE_URL , request } from '@/constants';


const checkAccessToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return Promise.reject("No access token set.");
    }
}

export const getGroups = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/groups`,
        method: 'GET',
    });
}

export const getTasksByGroup = async (idGroup) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/group/${idGroup}`,
        method: 'GET',
    });
}


export const getGroupMembers = async (id) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/groups/${id}/members`,
        method: 'GET',
    });
}

export const createGroup = async (groupData) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/groups`,
        method: 'POST',
        data:groupData
    });
}

export const editGroup = async ({id,groupData}) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/groups/${id}`,
        method: 'PUT',
        data:groupData
    });
}

export const leaveGroup = async (id) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/groups/${id}/leave`,
        method: 'POST'
    });
}