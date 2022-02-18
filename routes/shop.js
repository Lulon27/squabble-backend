
const express = require('express');
const router = express.Router();

const util = require('../response_util');
const squabbleAuth = util.squabbleAuth;

router.get('/items', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.post('/items/:itemId/buy', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;