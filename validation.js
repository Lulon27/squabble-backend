const { checkSchema } = require('express-validator');

const schema = {};
schema.create_account = checkSchema(
{
    email:
    {
        in: ['body'],
        exists: existsCustom('validation.email.missing'),
        isEmail: true
    },
    username:
    {
        in: ['body'],
        exists: existsCustom('validation.username.missing'),
        isLength: isLengthCustom(4, 24, 'validation.username.length'),
        trim: true
    },
    password:
    {
        in: ['body'],
        exists: existsCustom('validation.password.missing'),
        isLength: isLengthCustom(6, 32, 'validation.password.length'),
    },
    petName:
    {
        in: ['body'],
        exists: existsCustom('validation.pet_name.missing'),
        isLength: isLengthCustom(3, 16, 'validation.pet_name.length'),
        trim: true
    },
    petKind:
    {
        in: ['body'],
        exists: existsCustom('validation.pet_kind.missing'),
        isIn:
        {
            options: [['KANGAROO']],
            errorMessage: {msg: 'validation.pet_kind.invalid'},
        },
        trim: true
    },
    pictureId:
    {
        in: ['body'],
        exists: existsCustom('validation.picture_id.missing'),
        isInt: {errorMessage: {msg: 'validation.picture_id.invalid'}},
        toInt: true
    },
    petImage:
    {
        in: ['body'],
        optional:
        {
            nullable: true
        },
        trim: true,
        isBase64: {errorMessage: {msg: 'validation.pet_image.invalid'}}
    }
});

function isLengthCustom(min, max, errMsg)
{
    return {
        errorMessage:
        {
            msg: errMsg,
            params:
            {
                'min': min,
                'max': max
            }
        },
        options: { 'min': min, 'max': max }
    };
}
function existsCustom(errMsg)
{
    return {
        errorMessage: {msg: errMsg},
        bail: true
    };
}

module.exports.schema = schema;