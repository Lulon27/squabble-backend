
const express = require('express');
const router = express.Router();
const auth = require('../../config/passport-config').auth;

router.get('/', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

router.post('/:itemId/use', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;