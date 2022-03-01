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

async function registerAccount(email, username, password, pictureId, petName, petKind, petImagePath)
{
    let result = await doQuery('CALL RegisterAccount(?, ?, ?, ?, ?, ?, ?);',
    [email, username, password, pictureId, petName, petKind, petImagePath]);
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

async function getAccountPetID(username)
{
    let result = await doQuery('SELECT pet_id FROM account WHERE username = ?;', [username]);
    if(result && result[0])
    {
        return result[0].pet_id;
    }
    return null;
}

async function updateRow(table, where, values)
{
    let query = `UPDATE ${table} SET `;
    let sqlValues = [];
    const valKeys = Object.keys(values);
    for (let i = 0; i < valKeys.length; i++)
    {
        query += `${valKeys[i]}=?`;
        if(i < valKeys.length - 1)
        {
            query += ',';
        }
        sqlValues.push(values[valKeys[i]]);
    }

    query += ` WHERE ${where.column}=?;`;
    sqlValues.push(where.value);

    await doQuery(query, sqlValues);
}

async function updateAccount(account_name, body)
{
    const accountProps =
    [
        {bodyName: 'email'},
        {bodyName: 'username'},
        {bodyName: 'password'},
        {bodyName: 'pictureId', dbName: 'picture_id'}
    ];
    const petProps =
    [
        {bodyName: 'petName', dbName: 'pet_name'},
        {bodyName: 'petKind', dbName: 'pet_kind'}
    ];

    let accountValues = {};
    let petValues = {};

    for(let [key, value] of Object.entries(body))
    {
        let foundAccProp = false;
        for (const e of accountProps)
        {
            if(e.bodyName === key)
            {
                accountValues[e.dbName || e.bodyName] = value;
                foundAccProp = true;
                break;
            }
        }

        if(!foundAccProp)
        {
            for (const e of petProps)
            {
                if(e.bodyName === key)
                {
                    petValues[e.dbName || e.bodyName] = value;
                    break;
                }
            }
        }
    }
    
    if(Object.keys(petValues).length !== 0)
    {
        const petId = await getAccountPetID(account_name);
        await updateRow('pokepets', {column: 'pet_id', value: petId}, petValues);
    }
    await updateRow('account', {column: 'username', value: account_name}, accountValues);
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
module.exports.updateAccount = updateAccount;