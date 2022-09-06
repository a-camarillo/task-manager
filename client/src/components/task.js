import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Task = (props) => {

    return (
        <Container>
            <Row>
                <h3> {props.task.description} </h3>
                <p> {new Date(props.task.created_at).toLocaleDateString()} </p>
            </Row>
        </Container>
    )

}

export default Task;