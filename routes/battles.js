
const express = require('express');
const router = express.Router()

router.get('/:battleId', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/:battleId/turn', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;