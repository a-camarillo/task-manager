import express from 'express';
import { query as db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let { rows } = await db('SELECT * FROM projects')
    res.send(rows)
});

router.get('/:id', async (req, res) => {
    let { id } = req.params
    let { rows } = await db('SELECT * FROM projects WHERE id = $1', [id])
    res.send(rows[0])
});

router.get('/:id/tasks/', async (req, res) => {
    let projectId = req.params.id
    let { rows } = await db('SELECT * FROM tasks WHERE project_id = $1', [projectId])
    res.send(rows)
});

router.post('/', async (req, res) => {
    let title = req.body.title
    let { rows } = await db('INSERT INTO projects (title) VALUES ($1)', [title])
    res.status(200).send(rows[0])
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    await db('DELETE FROM projects WHERE id = $1', [id])
    res.status(200).send(`Project ${id} has been deleted`)
});

router.put('/:id', async (req, res) => {
    let {id, title} = req.body
    let { rows } = await db('UPDATE projects SET title = $2 WHERE id = $1', [id, title]);
    res.status(200).send(rows[0])
})

export default router;