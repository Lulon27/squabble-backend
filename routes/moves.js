
const express = require('express');
const router = express.Router();

const util = require('../response_util');
const squabble = util.squabble;

router.get('/:moveId', squabble, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;