const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// import routes
const tasks = require('./routes/tasks');
const projects = require('./routes/projects');

app.use('/tasks', tasks);
app.use('/projects', projects);

app.get('/', (req, res) => {
    res.send('This is my express server');
});
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
