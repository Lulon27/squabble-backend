const express = require('express');
const router = express.Router();

const passport = require('passport');
const auth = require('../config/passport-config').auth;
const bcryptjs = require('bcryptjs');
const users = require('../users');

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

router.post('/', async (req, res) =>
{
    try
    {
        //Very simple user creation for example purposes
        //Will be replaced with appropriate user creation
        console.log(newUser);
        var pass = await bcryptjs.hash(req.body.password, 10);
        const user = newUser(i, req.body.username, pass);
        i += 1;
        res.status(201).json({
            "code": "SUCCESS",
            "devMsg": "",
            "content": null
          });
        console.log('Registered user: ');
        console.log(user);
    }
    catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/login', passport.authenticate('local', { failWithError: true }),
function(req, res, next)
{
    return res.send(
    {
        code: "SUCCESS",
        devMsg: "",
        content: null
    }
)},
function(err, req, res, next)
{
    return res.status(401).send(
    {
        code: "ERR_ACC_NOT_FOUND",
        devMsg: `Account '${req.body.username}' wurde nicht gefunden oder das Passwort ist falsch.`,
        content: null
    }
)})

router.delete('/logout', auth, async (req, res) =>
{
    if (req.session)
    {
        req.session.destroy(err =>
        {
            if (err)
            {
                res.status(400).json(
                {
                    code: "ERR_LOGOUT_FAIL",
                    devMsg: "Failed to log out for some reason",
                    content: null
                });
            }
            else
            {
                res.status(200).json(
                {
                    code: "SUCCESS",
                    devMsg: "",
                    content: null
                });
            }
        });
    }
    else
    {
        res.end();
    }
});

router.get('/:accountName', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

router.patch('/:accountName', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

router.delete('/:accountName', auth, async (req, res) =>
{
    res.status(418).send("Not yet implemented");
});

module.exports = router;