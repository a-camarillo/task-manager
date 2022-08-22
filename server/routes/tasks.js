import express from 'express';
import { query as db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let { rows } = await db('SELECT * FROM tasks')
    res.send(rows)
});

router.get('/:id', async (req, res) => {
    let { id } = req.params
    let { rows } = await db('SELECT * FROM tasks WHERE id = $1', [id])
    res.send(rows[0])
});


export default router;
