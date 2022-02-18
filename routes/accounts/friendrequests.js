
const express = require('express');
const router = express.Router();

const util = require('../../response_util');
const squabbleAuth = util.squabbleAuth;

router.post('/create', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.post('/accept', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.post('/decline', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;