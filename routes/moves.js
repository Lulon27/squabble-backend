
const express = require('express');
const router = express.Router();

const squabble = require('../response_util').squabble;

router.get('/:moveId', squabble, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
})

module.exports = router;