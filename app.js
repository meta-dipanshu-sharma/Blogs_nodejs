const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//Database
const db = require('./config/database');


//Test db
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error' + err))

const app = express();

//Handlebars

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))

//Set static folder

app.use(express.static(path.join(__dirname, 'public')));

//Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

//Blog routes

app.use('/blogs', require('./routes/blogs'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
