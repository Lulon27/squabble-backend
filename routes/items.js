
const express = require('express');
const router = express.Router();

const util = require('../response_util');
const squabble = util.squabble;

router.get('/:itemId', squabble, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;