import React, { useState, useEffect } from 'react';
import { getTasks } from '../service';

const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        getTasks().then((response) => {
            setTasks(response.data)
            }
        )
    },[]);

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {task.description} {new Date(task.created_at).toLocaleString()} 
                </li>
            ))}
        </ul>
    );
}

export default Tasks;