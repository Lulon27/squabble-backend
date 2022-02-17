
const express = require('express');
const router = express.Router()

router.post('/', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/login', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.get('/logout', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

router.get('/:accountName', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

router.patch('/:accountName', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

router.delete('/:accountName', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

module.exports = router;