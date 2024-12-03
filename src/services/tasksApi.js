import {ACCESS_TOKEN, API_BASE_URL, request} from "../../../../Projet_Todolist/todolist_front/src/constants/index.js";

const checkAccessToken = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return Promise.reject("No access token set.");
    }
}

export const getTasks = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks`,
        method: 'GET',
    });
}

export const getArchivedTasks = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/archived`,
        method: 'GET',
    });
}

export const getCollaborativeTasks = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/collaborative`,
        method: 'GET',
    });
}

export const getPersonalTasks = async () => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/personal`,
        method: 'GET',
    });
}

export const createTask = async (taskData) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + '/api/tasks',
        method: 'POST',
        data: taskData,
    });
}

export const editTask = async ({idTask,taskData}) => {
    await checkAccessToken();
    console.log("taskData",taskData)
    return request({
        url: API_BASE_URL + `/api/tasks/${idTask}`,
        method: 'PUT',
        data:taskData
    });
}

export const archiveTask = async (id) => {
    await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/${id}/archive`,
        method: 'PUT',
    });
}

export const updateStatusTask = async (updatedData) => {
    await checkAccessToken();
    return request({
        url: API_BASE_URL + `/api/tasks/${updatedData.taskId}/update-status`,
        method: 'PUT',
        data: { statusId: updatedData.statusId }
    });
}

export const deleteTask = async (id) => {
    //await checkAccessToken();

    return request({
        url: API_BASE_URL + `/api/tasks/${id}`,
        method: 'DELETE',
    });
}

