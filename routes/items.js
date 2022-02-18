
const express = require('express');
const router = express.Router();

router.get('/:itemId', async (req, res) =>
{
    res.status(418).send("Not yet implemented");
})

module.exports = router;