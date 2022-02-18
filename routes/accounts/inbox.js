
const express = require('express');
const router = express.Router();

const squabbleAuth = require('../../response_util').squabbleAuth;

router.get('/', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.delete('/:msgId', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;