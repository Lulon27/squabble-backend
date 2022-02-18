const responses =
{
    success: { code: 200, msg: 'SUCCESS'},
    created: { code: 201, msg: 'SUCCESS'},
    acc_not_found: { code: 401, msg: 'ERR_ACC_NOT_FOUND'},
    unauthorized: { code: 401, msg: 'ERR_UNAUTHORIZED'},
    logout_fail: { code: 400, msg: 'ERR_LOGOUT_FAIL'},
    not_implemented: { code: 418, msg: 'ERR_NOT_IMPLEMENTED'}
};

function setSendSquabbleResponse(res)
{
    res.sendSquabbleResponse = (response, dvMsg, ctnt) =>
    {
        res.status(response.code).json(
        {
            code: response.msg,
            devMsg: dvMsg,
            content: ctnt
        });
    };
}

function squabbleMiddleware(req, res, next)
{
    setSendSquabbleResponse(res);
    next();
}

function squabbleAuthMiddleware(req, res, next)
{
    setSendSquabbleResponse(res);

    if(req.isAuthenticated())
    {
        return next();
    }
    res.sendSquabbleResponse(responses.unauthorized, '', null);
}

module.exports.responses = responses;
module.exports.squabble = squabbleMiddleware;
module.exports.squabbleAuth = squabbleAuthMiddleware;