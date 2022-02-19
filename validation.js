const { checkSchema } = require('express-validator');

const schema = {};
schema.create_account = checkSchema(
{
    email:
    {
        in: ['body'],
        isEmail: true
    },
    username:
    {
        in: ['body'],
        isLength: isLengthCustom(4, 24, 'validation.username.length'),
        trim: true
    },
    password:
    {
        in: ['body'],
        isLength: isLengthCustom(6, 32, 'validation.password.length'),
    },
    petName:
    {
        in: ['body'],
        isLength: isLengthCustom(0, 8, 'validation.pet_name.length'),
        trim: true
    },
    petKind:
    {
        in: ['body'],
        isIn:
        {
            options: [['KANGAROO']],
            errorMessage: {msg: 'Invalid pet kind'},
        },
        trim: true
    },
    pictureId:
    {
        in: ['body'],
        errorMessage: {msg: 'validation.picture_id.invalid'},
        isInt: true,
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
        isBase64: true,
        errorMessage: {msg: 'validation.pet_image.invalid'},
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

module.exports.schema = schema;