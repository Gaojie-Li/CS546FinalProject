const homeRoute = require('./home');
const loginRoute = require('./login');
const listsRoute = require('./lists');
const registerRoute = require('./register');
const profileRoute = require('./profile');
const aboutRoute = require('./about')

const constructorMethod = (app) => {
    app.get('/', function (req, res) {
        if (req.user) {
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    });

    app.use('/home', homeRoute);
    app.use('/login', loginRoute);
    app.use('/lists', listsRoute);
    app.use('/register', registerRoute);
    app.use('/profile', profileRoute);
    app.use('/about', aboutRoute);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
}

module.exports = constructorMethod;