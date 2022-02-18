
const express = require('express');
const router = express.Router();

const util = require('../../response_util');
const squabbleAuth = util.squabbleAuth;

router.get('/', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;