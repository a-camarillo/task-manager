const express = require('express');
const router = express.Router();

// import db adapter
const db = require('../db');

router.get('/', async (req, res) => {
    let { rows } = await db.query('SELECT * FROM tasks')
    res.send(rows)
});

router.get('/:id', async (req, res) => {
    let { id } = req.params
    let { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id])
    res.send(rows[0])
});



module.exports = router;
