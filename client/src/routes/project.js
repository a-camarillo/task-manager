import React, { useState, useEffect } from 'react';
import { getProject, getProjectTasks } from '../service';
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

    return (
        <div>
            <h1 key={project.id}>
                {project.title}
            </h1>
            <button>Create New Task</button>
            {tasks.map(task => (
                <div key={task.id}>
                    <p>{task.description}</p>
                    <p>{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}

export default Project;