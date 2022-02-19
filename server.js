if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

//Node libs
const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger.yml');
const session = require('express-session');
const users = require('./users');
const morgan = require('morgan');

const app = express();

//Configure passport
const configPassport = require('./config/passport-config');
configPassport.configPassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id));

//Logging
app.use(morgan('short'));

//Configure express
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'dwadw',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Add routers
app.use('/accounts',                                require('./routes/accounts'));
app.use('/accsearch',                               require('./routes/accsearch'));
app.use('/accounts/:accountName/inbox',             require('./routes/accounts/inbox'));
app.use('/accounts/:accountName/friends',           require('./routes/accounts/friends'));
app.use('/accounts/:accountName/friendrequests',    require('./routes/accounts/friendrequests'));
app.use('/accounts/:accountName/battles',           require('./routes/accounts/battles'));
app.use('/accounts/:accountName/inventory',         require('./routes/accounts/inventory'));
app.use('/battles',                                 require('./routes/battles'));
app.use('/moves',                                   require('./routes/moves'));
app.use('/pets',                                    require('./routes/pets'));
app.use('/items',                                   require('./routes/items'));
app.use('/shop',                                    require('./routes/shop'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT);
