
const express = require('express');
const router = express.Router()

router.get('/:petId', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.patch('/:petId', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;