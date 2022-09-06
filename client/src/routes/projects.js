import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, postProject, deleteProject } from '../service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


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
        <Container>
            <Row>
                <h1>
                    Projects
                </h1>
            </Row>
                {projects.map(project => (
                    <Row key={project.id} id={project.id}>
                        <Link to={`${project.id}`}>
                            <Col>
                                {project.title} {new Date(project.created_at).toLocaleDateString()}
                            </Col>
                            <Col>
                                <Button onClick={() => deleteProject(project.id)}>
                                    Delete Here
                                </Button>
                            </Col>
                        </Link>
                        {/* <Button onClick={() => deleteProject(project.id)}>
                            Delete Here
                        </Button> */}
                    </Row>
                ))}
            <form onSubmit={submitProject}>
                <label>
                    Title: 
                    <input type="text" name="title"/>
                </label>
                <input type="submit" name="Submit"/>
            </form>
        </Container>
    );
}


export default Projects;