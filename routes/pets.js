
const express = require('express');
const router = express.Router();

const squabbleAuth = require('../response_util').squabbleAuth;

router.get('/:petId', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

router.patch('/:petId', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;