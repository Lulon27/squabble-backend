const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcryptjs = require('bcryptjs');
const users = require('../users');

const util = require('../response_util');
const squabble = util.squabble;
const squabbleAuth = util.squabbleAuth;

const validation = require('../validation');
const { validationResult } = require('express-validator');

function newUser(id, name, pass)
{
    const user = {
        id: id,
        email: name,
        password: pass
    };
    users.push(user);
    return user;
}

var i = 0;

router.post('/', squabble, validation.schema.create_account, async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.sendSquabbleResponse(util.responses.validation_fail, '', null, errors);
    }
    console.log('Client tried to register account with validated body:');
    console.log(req.body);

    //Very simple user creation for example purposes
    //Will be replaced with appropriate user creation
    var pass = await bcryptjs.hash(req.body.password, 10);
    const user = newUser(i, req.body.username, pass);
    i += 1;
    res.sendSquabbleResponse(util.responses.created);
    console.log('Registered user: ');
    console.log(user);
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
    res.sendSquabbleResponse(util.responses.not_implemented, '', null);
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