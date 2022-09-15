import React, { useState, useEffect } from 'react';
import { getProject, getProjectTasks, postTask, deleteTask, updateTask } from '../service';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Task from '../components/task';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

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

    // PUT request to the API tasks/:id endpoint
    const editTask = (e,taskId) => {
        e.preventDefault();
        const newDescription = e.target.description.value
        console.log(newDescription)
        updateTask(taskId, newDescription)
    }

    // logic for current task state to use for deletions
    const [currentTask, setCurrentTask] = useState({});
    

    // logic for Create Task Modal 
    const [createShow, setCreateShow] = useState(false);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);

    // logic for Delete Task Modal
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

    // logic for Update Task Modal
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);

    // logic for wrapping Rows every third task
    const tasksCopy = [...tasks]
    const rows = [...Array(Math.ceil(tasks.length / 3))];
    const taskRows = rows.map((row,idx) => tasksCopy.slice(idx*3,idx*3 + 3));
    const showTasks = taskRows.map( (row, idx) => (
        <Stack direction="horizontal" key={idx} gap={3} className="task-stack">
            {row.map( task => ( 
                <Col key={task.id} md={4} className="task-wrapper">
                    <Task task={task} />
                    <Button variant="danger" onClick={() => {handleDeleteShow();setCurrentTask(task);}}>
                        Delete Task
                    </Button>
                    <Button variant="secondary" onClick={() => {handleUpdateShow();setCurrentTask(task);}}>
                        Edit Task
                    </Button>
                    <Modal show={deleteShow}
                    onHide={handleDeleteClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    size="lg"
                    centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this task?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleDeleteClose}>
                                No
                            </Button>
                            <Button variant="success" onClick={() => {deleteTask(currentTask.id)}}>
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
                            <Modal.Title>Edit Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={(e) => {editTask(e,currentTask.id)}}>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control 
                                as="textarea"
                                name="description" 
                                placeholder="Please enter a new description for this task."
                                autoFocus
                                required
                                />
                            </Form.Group>
                            <Button variant="secondary" onClick={handleUpdateClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Save Task
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
                <h1 key={project.id}>
                    {project.title}
                </h1>
            </Row>
            <Button variant="primary" onClick={handleCreateShow}>
                Create New Task
            </Button>
            <Modal show={createShow} 
            onHide={handleCreateClose} 
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
                            <Button variant="secondary" onClick={handleCreateClose}>
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