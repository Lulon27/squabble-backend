const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcryptjs = require('bcryptjs');

const util = require('../response_util');
const squabble = util.squabble;
const squabbleAuth = util.squabbleAuth;

const validation = require('../validation');
const { validationResult } = require('express-validator');

const database = require('../database');

router.post('/', squabble, validation.schema.create_account, async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.sendSquabbleResponse(util.responses.validation_fail, '', null, errors);
    }
    console.log('Client tried to register account with validated body:');
    console.log(req.body);

    if(await database.isUsernameTaken(req.body.username))
    {
        console.log('Registration failed: username taken.');
        res.sendSquabbleResponse(util.responses.username_taken);
        return;
    }

    if(await database.isEmailTaken(req.body.email))
    {
        console.log('Registration failed: email taken.');
        res.sendSquabbleResponse(util.responses.email_taken);
        return;
    }

    let pass = await bcryptjs.hash(req.body.password, 10);
    let success = await database.registerAccount(req.body.email, req.body.username, pass, req.body.petName, req.body.petKind, null);

    if(success)
    {
        console.log('Registration successful.');
        res.sendSquabbleResponse(util.responses.created);
    }
    else
    {
        console.log('Registration failed.');
        res.sendSquabbleResponse(util.responses.internal_server_error, 'Einfügen in die Datenbank aus irgendeinem Grund fehlgeschlagen');
    }
})

router.post('/login', squabble, passport.authenticate('local', { failWithError: true }),
function(req, res, next)
{
    return res.sendSquabbleResponse(util.responses.success, '', null);
},
function(err, req, res, next)
{
    return res.sendSquabbleResponse(util.responses.acc_not_found, `Account '${req.query.username}' wurde nicht gefunden oder das Passwort ist falsch.`, null);
});

router.delete('/logout', squabbleAuth, async (req, res) =>
{
    if (req.session)
    {
        req.session.destroy(err =>
        {
            if (err)
            {
                res.sendSquabbleResponse(util.responses.logout_fail, 'Failed to log out for some reason', null);
            }
            else
            {
                res.sendSquabbleResponse(util.responses.success, '', null);
            }
        });
    }
    else
    {
        res.end();
    }
});

router.get('/:accountName', squabbleAuth, async (req, res) =>
{
    if(req.user.username !== req.params.accountName)
    {
        res.sendSquabbleResponse(util.responses.unauthorized, '', null);
        return;
    }

    acc = await database.getAccount(req.params.accountName);

    if(acc == null)
    {
        res.sendSquabbleResponse(util.responses.acc_not_found, '', null);
    }
    else
    {
        res.sendSquabbleResponse(util.responses.success, '', acc);
    }
});

router.patch('/:accountName', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
});

router.delete('/:accountName', squabbleAuth, async (req, res) =>
{
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
});

module.exports = router;