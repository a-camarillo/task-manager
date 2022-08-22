import express from 'express';
import { query as db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let { rows } = await db.query('SELECT * FROM projects')
    res.send(rows)
});

router.get('/:id', async (req, res) => {
    let { id } = req.params
    let { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [id])
    res.send(rows[0])
});

router.get('/:id/tasks/', async (req, res) => {
    let project_id = req.params.id
    let { rows } = await db.query('SELECT * FROM tasks WHERE project_id = $1', [project_id])
    res.send(rows)
});

router.post('/', async (req, res) => {
    let title = req.body
    let { rows } = await db.query('INSERT INTO products (title) VALUES ($1)', [title])
    res.send(rows[0])
});


export default router;