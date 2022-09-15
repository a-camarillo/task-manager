import express from 'express';
import { query as db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let { rows } = await db('SELECT * FROM tasks')
    res.send(rows)
});

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let { rows } = await db('SELECT * FROM tasks WHERE id = $1', [id])
    res.send(rows[0])
});

router.post('/', async (req, res) => {
    let { description, project_id } = req.body
    let { rows } = await db('INSERT INTO tasks (description, project_id) VALUES ($1,$2)',[description, project_id]);
    res.status(200).send(rows[0])
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    await db('DELETE FROM tasks WHERE id = $1', [id])
    res.status(200).send(`Task ${id} has been deleted`)
})

router.put('/:id', async (req, res) => {
    let {id, description } = req.body
    let { rows } = await db('UPDATE tasks SET description = $2 WHERE id = $1',[id, description]);
    res.status(200).send(rows[0])
})

export default router;
