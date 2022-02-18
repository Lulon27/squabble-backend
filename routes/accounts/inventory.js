
const express = require('express');
const router = express.Router();

const squabbleAuth = require('../../response_util').squabbleAuth;

router.get('/', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.post('/:itemId/use', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;