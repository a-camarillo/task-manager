import axios from 'axios';

const getTasks = async() => {
    try {
        const response = await axios.get('http://localhost:5000/tasks');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getProjects = async() => {
    try {
        const response = await axios.get('http://localhost:5000/projects');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const getProjectTasks = async(projectId) => {
    try {
        const response = await axios.get(`http://localhost:5000/projects/${projectId}/tasks`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const postProject = async(title) => {
    console.log(title)
    try {
        const response = await axios.post('http://localhost:5000/projects',{
            title
        })
        window.location.reload();
        console.log(response)
    } catch (error) {
        console.error(error);
    }
}

const deleteProject= async(projectId) => {
    console.log(projectId)
    try {
        const response = await axios.delete(`http://localhost:5000/projects/${projectId}`)
        window.location.reload();
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }
}

export { getTasks, getProjects, postProject, deleteProject, getProjectTasks };