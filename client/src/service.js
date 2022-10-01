import axios from 'axios';

const baseUrl = 'http://localhost:5000'

const getTasks = async() => {
    try {
        const response = await axios.get(`${baseUrl}/tasks`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getProjects = async() => {
    try {
        const response = await axios.get(`${baseUrl}/projects`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getProject = async(projectId) => {
    console.log(projectId)
    try {
        const response = await axios.get(`${baseUrl}/projects/${projectId}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getProjectTasks = async(projectId) => {
    try {
        const response = await axios.get(`${baseUrl}/projects/${projectId}/tasks`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const postProject = async(title) => {
    console.log(title)
    try {
        const response = await axios.post(`${baseUrl}/projects`,{
            title
        })
        window.location.reload();
        console.log(response)
    } catch (error) {
        console.error(error);
    }
}

const postTask = async(description, projectId) => {
    try {
        const response = await axios.post(`${baseUrl}/tasks`, {
            description: description,
            project_id: projectId
        })
        window.location.reload();
        console.log(response)
    } catch (error) {
        console.error(error);
    }
}

const deleteProject= async(projectId) => {
    try {
        const response = await axios.delete(`${baseUrl}/projects/${projectId}`)
        window.location.reload();
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }
}

const deleteTask = async(taskId) => {
    try {
        const response = await axios.delete(`${baseUrl}/tasks/${taskId}`)
        window.location.reload();
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }
}

const updateTask = async(taskId, description) => {
    try {
        const response = await axios.put(`${baseUrl}/tasks/${taskId}`, {
            id: taskId,
            description: description
        })
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
}

const updateProject = async(projectId, title) => {
    try {
        const response = await axios.put(`${baseUrl}/projects/${projectId}`, {
            id: projectId,
            title: title
        })
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
}

export { 
        getTasks, 
        getProjects, 
        postProject, 
        deleteProject,
        deleteTask, 
        getProjectTasks, 
        getProject, 
        postTask,
        updateTask,
        updateProject 
};