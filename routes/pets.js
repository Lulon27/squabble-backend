
const express = require('express');
const router = express.Router();
const auth = require('../config/passport-config').auth;

router.get('/:petId', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.patch('/:petId', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;