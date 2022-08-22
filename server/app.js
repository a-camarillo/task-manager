import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import tasks from './routes/tasks.js';
import projects from './routes/projects.js';

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use('/tasks', tasks);
app.use('/projects', projects);

app.get('/', (req, res) => {
    res.send('This is my express server');
});
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
