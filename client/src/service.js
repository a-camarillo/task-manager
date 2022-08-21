import axios from 'axios';

async function getTasks() {
    try {
        const response = await axios.get('http://localhost:5000/tasks');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getProjects() {
    try {
        const response = await axios.get('http://localhost:5000/projects');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export { getTasks, getProjects };