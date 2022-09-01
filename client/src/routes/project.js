import React, { useState, useEffect } from 'react';
import { getProject, getProjectTasks, postTask } from '../service';
import { useParams } from 'react-router-dom';

const Project = () => {

    let { id } = useParams();

    const [project, setProject] = useState({});
    useEffect(() => {
        getProject(id).then((response) => {
            setProject(response.data)
        })
    }, []);

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getProjectTasks(id).then((response) => {
            setTasks(response.data)
        })
    }, []);

    const submitTask = (e) => {
        e.preventDefault();
        const projectId = id
        const description = e.target.description.value
        postTask(description, projectId);
    }

    return (
        <div>
            <h1 key={project.id}>
                {project.title}
            </h1>
            <button>Create New Task</button>
            <form onSubmit={submitTask}>
                <label>
                    New Task:
                    <input type="text" name="description"/>
                </label>
                <input type="submit" name="Submit"/>
            </form>
            {tasks.map(task => (
                <div key={task.id}>
                    <p>{task.description}</p>
                    <p>{new Date(task.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}

export default Project;