const mariadb = require('mariadb');

console.log(
`Connecting to database with the following information:
  Host: ${process.env.DB_HOST}
  User: ${process.env.DB_USER}
  DB Name: ${process.env.DB_NAME}`
);
const db_connect_pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    connectionLimit: 4,
    database: process.env.DB_NAME
});

function getPool()
{
    return db_connect_pool;
}

async function doQuery(query, values)
{
    try
    {
        const result = await db_connect_pool.query(query, values);
        return result;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

async function getAccount(account_name)
{
    let acc = await doQuery(
    `SELECT
    account.email,
    account.username,
    account.picture_id AS pictureId,
    account.money,
    account.pet_id AS petId,
    pokepets.pet_name as petName,
    pokepets.pet_kind as petKind,
    pokepets.pet_level as petLvl,
    pokepets.pet_image as petImage
    FROM account
    JOIN pokepets ON account.pet_id = pokepets.pet_id 
    WHERE username = ?;`, [account_name]);

    if(acc && acc[0])
    {
        return acc[0];
    }
    return null;
}

async function registerAccount(email, username, password, petName, petKind, petImagePath)
{
    let result = await doQuery('CALL RegisterAccount(?, ?, ?, ?, ?, ?);',
    [email, username, password, petName, petKind, petImagePath]);
    if(result.affectedRows == 2)
    {
        return true;
    }
    return false;
}

async function getPetKindNames()
{
    let result = await doQuery('SELECT name FROM pet_kind;');

    if(result)
    {
        let names = [];
        result.forEach(e =>
        {
            names.push(e.name);
        });
        return names;
    }
    return null;
}

async function isUsernameTaken(username)
{
    let result = await doQuery('SELECT EXISTS(SELECT * FROM account WHERE username = ?);', [username]);

    if(result && result[0])
    {
        return Object.values(result[0])[0] === 1;
    }
    return true;
}

async function isEmailTaken(email)
{
    let result = await doQuery('SELECT EXISTS(SELECT * FROM account WHERE email = ?);', [email]);

    if(result && result[0])
    {
        return Object.values(result[0])[0] === 1;
    }
    return true;
}

async function getAccountAuthData(username)
{
    let result = await doQuery('SELECT acc_id, password FROM account WHERE username = ?;', [username]);

    if(result && result[0])
    {
        return result[0];
    }
    return null;
}

async function getAccountByID(acc_id)
{
    let result = await doQuery('SELECT acc_id, email, username FROM account WHERE acc_id = ?;', [acc_id]);

    if(result && result[0])
    {
        return result[0];
    }
    return null;
}



async function searchAccounts(filter)
{
    filter = filter
    .replaceAll('!', '!!')
    .replaceAll('%', '!%')
    .replaceAll('_', '!_')
    .replaceAll('[', '![');
    let result = await doQuery(
    `SELECT
    account.username,
    account.picture_id AS pictureId,
    pokepets.pet_name as petName,
    pokepets.pet_kind as petKind,
    pokepets.pet_level as petLvl
    FROM account
    JOIN pokepets ON account.pet_id = pokepets.pet_id
    WHERE account.username LIKE ?
    LIMIT 10;`, [`%${filter}%`]);

    if(result)
    {
        return result;
    }
    return null;
}

module.exports.getPool = getPool;
module.exports.doQuery = doQuery;

module.exports.getAccount = getAccount;
module.exports.registerAccount = registerAccount;
module.exports.getPetKindNames = getPetKindNames;
module.exports.isUsernameTaken = isUsernameTaken;
module.exports.isEmailTaken = isEmailTaken;
module.exports.getAccountAuthData = getAccountAuthData;
module.exports.getAccountByID = getAccountByID;
module.exports.searchAccounts = searchAccounts;