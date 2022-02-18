const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

function configPassport(passport, getUserByEmail, getUserById)
{
    const authenticateUser = async (email, password, done) =>
    {
        const user = getUserByEmail(email);
        console.log('Authenticating user');
        console.log(user);
        if(user == null)
        {
            return done(null, false,
            {
                code: "ERR_ACC_NOT_FOUND",
                devMsg: `Account '${email}' wurde nicht gefunden oder das Passwort ist falsch.`,
                content: null
            });
        }

        try
        {
            if(await bcrypt.compare(password, user.password))
            {
                return done(null, user)
            }
            else
            {
                return done(null, false,
                {
                    code: "ERR_ACC_NOT_FOUND",
                    devMsg: `Account '${email}' wurde nicht gefunden oder das Passwort ist falsch.`,
                    content: null
                });
            }
        }
        catch(e)
        {
            return done(e);
        }
    }
    passport.use(new LocalStrategy({}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

function auth(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.sendStatus(401);
}

module.exports.configPassport = configPassport;
module.exports.auth = auth;