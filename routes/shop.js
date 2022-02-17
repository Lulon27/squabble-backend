
const express = require('express');
const router = express.Router()

router.get('/items', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/items/:itemId/buy', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;