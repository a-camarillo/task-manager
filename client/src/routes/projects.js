import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, postProject, deleteProject } from '../service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const Projects = () => {

    // GET request to the API projects endpoint and set the projects state with the response
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        getProjects().then((response) => {
            setProjects(response.data)
        })
    },[]);

    // POST request to the API projects endpoint
    const submitProject = (e) => {
        e.preventDefault();
        const projectTitle = e.target.title.value;
        postProject(projectTitle);
    };

    // logic for Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <h1>
                Projects
            </h1>
            <Button variant="primary" onClick={handleShow}>
                Create New Project
            </Button>
            <Modal show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitProject}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control 
                            type="input"
                            name="title"
                            placeholder="Please enter the project title"
                            autoFocus
                            required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Save Project
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
                {projects.map(project => (
                    <Row key={project.id} id={project.id}>
                        <Col>
                            <Link to={`${project.id}`}>
                                    {project.title} {new Date(project.created_at).toLocaleDateString()}
                            </Link>
                        </Col>
                        <Col>
                            <Button onClick={() => deleteProject(project.id)}>
                                Delete Here
                            </Button>
                        </Col>
                    </Row>
                ))}
        </Container>
    );
}


export default Projects;