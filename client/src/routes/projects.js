import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, postProject, deleteProject, updateProject } from '../service';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

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

    // PUT request to the API tasks/:id endpoint
    const editProject = (e,projectId) => {
        e.preventDefault();
        const newTitle = e.target.title.value
        console.log(newTitle)
        updateProject(projectId, newTitle)
    }

    // logic for current project state to use for deletions
    const [currentProject, setCurrentProject] = useState({});

    // logic for Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // logic for Delete Task Modal
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    // logic for Update Task Modal
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    const projectsCopy = [...projects]
    const rows = [...Array(Math.ceil(projects.length / 3))];
    const projectRows = rows.map((row,idx) => projectsCopy.slice(idx*3, idx*3 + 3));
    const showProjects = projectRows.map((row,idx) => (
        <Stack direction="horizontal" key={idx} gap={3} className="project-stack">
            {row.map( project => (
                <Col key={project.id} md={4} className="project-wrapper">
                    <Link to={`${project.id}`}>
                        <Button variant="primary" className="project-button">
                                <h3>{project.title}</h3> 
                                <p>Created On: {new Date(project.created_at).toLocaleDateString()}</p>
                        </Button>
                    </Link>
                    <Button variant="danger" onClick={() => {handleDeleteShow();setCurrentProject(project);}}>
                        Delete Project
                    </Button>
                    <Button variant="secondary" onClick={() => {handleUpdateShow();setCurrentProject(project);}}>
                        Edit Project
                    </Button>
                    <Modal show={deleteShow}
                    onHide={handleDeleteClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    size="lg"
                    centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this project?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleDeleteClose}>
                                No
                            </Button>
                            <Button variant="success" onClick={() => {deleteProject(currentProject.id)}}>
                                Confirm Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={updateShow}
                    onHide={handleUpdateClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    size="lg"
                    centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={(e) => {editProject(e,currentProject.id)}}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Project Title</Form.Label>
                                <Form.Control 
                                type="input"
                                name="title" 
                                placeholder="Please enter a new title for this project."
                                autoFocus
                                required
                                />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleUpdateClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Save Project
                            </Button>
                        </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            ))}
        </Stack>
    ))

    return (
        <Container>
            <Row>
                <h1>
                    Projects
                </h1>
            </Row>
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
            {showProjects}
        </Container>
    );
}


export default Projects;