const LocalStrategy = require('passport-local');
const bcryptjs = require('bcryptjs');
const database = require('../database');

function configPassport(passport)
{
    const authenticateUser = async (username, password, done) =>
    {
        const account = await database.getAccountAuthData(username);

        console.log('Authenticating user');
        console.log(account);

        if(account == null)
        {
            return done(null, false);
        }

        try
        {
            if(await bcryptjs.compare(password, account.password))
            {
                return done(null, account)
            }
            else
            {
                return done(null, false);
            }
        }
        catch(e)
        {
            return done(e);
        }
    }
    passport.use(new LocalStrategy({}, authenticateUser));
    passport.serializeUser((account, done) => done(null, account.acc_id));
    passport.deserializeUser(async (acc_id, done) =>
    {
        return done(null, await database.getAccountByID(acc_id));
    });
}



module.exports.configPassport = configPassport;