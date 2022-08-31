import React, { useState, useEffect } from 'react';
import { getProjects, postProject, deleteProject } from '../service';

const Projects = () => {

    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        getProjects().then((response) => {
            setProjects(response.data)
        })
    },[]);

    const submitProject = (e) => {
        e.preventDefault();
        const projectTitle = e.target.title.value;
        postProject(projectTitle);
    };

    return (
        <div>
            <ul>
                {projects.map(project => (
                    <li key={project.id} id={project.id}>
                        {project.title} {new Date(project.created_at).toLocaleDateString()}
                        <button onClick={() => deleteProject(project.id)}>Delete Here</button>
                    </li>
                ))}
                
            </ul>
            <form onSubmit={submitProject}>
                <label>
                    Title: 
                    <input type="text" name="title"/>
                </label>
                <input type="submit" name="Submit"/>
            </form>
        </div>
    );
}


export default Projects;