

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connections');
const path = require('path');
require('dotenv').config();
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// SET UP SESSION AND COOKIES
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));



// SET UP HANDLEBARS TEMPLATE ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});