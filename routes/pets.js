
const express = require('express');
const router = express.Router();

const util = require('../response_util');
const squabbleAuth = util.squabbleAuth;

router.get('/:petId', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.patch('/:petId', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;