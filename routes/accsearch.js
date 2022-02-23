
const express = require('express');
const router = express.Router();

const util = require('../response_util');
const squabbleAuth = util.squabbleAuth;

const database = require('../database');

router.get('/', squabbleAuth, async (req, res) =>
{
    const result = await database.searchAccounts(req.query.filter);
    if(!result)
    {
        res.sendSquabbleResponse(util.responses.internal_server_error);
        return;
    }
    res.sendSquabbleResponse(util.responses.success, '', result);
})

module.exports = router;