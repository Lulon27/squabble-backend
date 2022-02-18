
const express = require('express');
const router = express.Router();
const auth = require('../config/passport-config').auth;

router.get('/items', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/items/:itemId/buy', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;