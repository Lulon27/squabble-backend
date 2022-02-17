
const express = require('express');
const router = express.Router()

router.post('/create', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/accept', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/decline', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;