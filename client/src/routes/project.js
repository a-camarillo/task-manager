import React, { useState, useEffect } from 'react';
import { getProject, getProjectTasks, postTask } from '../service';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Task from '../components/task';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Project = () => {

    // Access the url parameters to get the project ID
    let { id } = useParams();

    // GET request to the API projects/:id endpoint and set the project state with the response
    const [project, setProject] = useState({});
    useEffect(() => {
        getProject(id).then((response) => {
            setProject(response.data)
        })
    }, []);

    // GET request to the API tasks endpoint and set the tasks state with tasks based on id parameter
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getProjectTasks(id).then((response) => {
            setTasks(response.data)
        })
    }, []);

    // POST request to the API tasks endpoint 
    const submitTask = (e) => {
        e.preventDefault();
        const projectId = id
        const description = e.target.description.value
        postTask(description, projectId);
    }

    // logic for Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // logic for wrapping Rows every third task
    const tasksCopy = [...tasks]
    const rows = [...Array(Math.ceil(tasks.length / 3))];
    const taskRows = rows.map((row,idx) => tasksCopy.slice(idx*3,idx*3 + 3));
    const showTasks = taskRows.map( (row, idx) => (
        <Row key={idx}>
            {row.map( task => ( 
                <Col key={task.id} md={4}>
                    <Task task={task} />
                </Col>
            ))}
        </Row>
    ))


    return (
        <Container>
            <Row>
                <h1 key={project.id}>
                    {project.title}
                </h1>
                <Button variant="primary" onClick={handleShow}>
                    Create New Task
                </Button>
            </Row>
            <Modal show={show} 
            onHide={handleClose} 
            aria-labelledby="contained-modal-title-vcenter" 
            size="lg"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form onSubmit={submitTask}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control 
                                as="textarea"
                                name="description" 
                                placeholder="Please enter a description for this task."
                                autoFocus
                                required
                                />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Save Task
                            </Button>
                        </Form>
                </Modal.Body>
            </Modal>
            {showTasks}
        </Container>
    )
}

export default Project;