if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require("./routes/index")
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.set('layout', "layouts/layout");
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('conected to mongoose'))

app.get('/', indexRouter)

app.listen(process.env.port || 3333, () => console.log("Escutando em: http://localhost:3333"));