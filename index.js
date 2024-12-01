const express = require('express')
const path = require('path')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express();
app.use(express.json());

require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

const port = 8080;

app.listen(port, () => {
    console.log("Listening on port " + port)
})