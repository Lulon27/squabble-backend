const responses =
{
    success: { code: 200, msg: 'SUCCESS'},
    created: { code: 201, msg: 'SUCCESS'},
    acc_not_found: { code: 401, msg: 'ERR_ACC_NOT_FOUND'},
    unauthorized: { code: 401, msg: 'ERR_UNAUTHORIZED'},
    logout_fail: { code: 400, msg: 'ERR_LOGOUT_FAIL'},
    not_implemented: { code: 418, msg: 'ERR_NOT_IMPLEMENTED'},
    validation_fail: { code: 422, msg: 'ERR_VALIDATION'}
};

function setSendSquabbleResponse(res)
{
    res.sendSquabbleResponse = (response, dvMsg = '', ctnt = null, errs = []) =>
    {
        if(errs.array && typeof errs.array === 'function') //is this a Result<ValidationError> from express-validator?
        {
            const validationErrors = errs.array();
            errs = [];
            validationErrors.forEach(e =>
            {
                errs.push(e.msg);
            });
        }

        res.status(response.code).json(
        {
            code: response.msg,
            devMsg: dvMsg,
            errors: errs,
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
    res.sendSquabbleResponse(responses.unauthorized);
}

module.exports.responses = responses;
module.exports.squabble = squabbleMiddleware;
module.exports.squabbleAuth = squabbleAuthMiddleware;