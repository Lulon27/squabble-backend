
const express = require('express');
const router = express.Router();
const auth = require('../../config/passport-config').auth;

router.post('/create', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/accept', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/decline', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;