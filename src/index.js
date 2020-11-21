require('./models/User'); //Definindo 1x só.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //helper library que vai automaticamente passar informção associada ao body das requests. Vai lidar com a info. json
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express(); 

app.use(bodyParser.json());//todo json ser lido antes de associar os request de baixo
app.use(authRoutes); //associando todos request com o main express aplication

const mongoUri = 'mongodb+srv://admin:admin@cluster0.mmk5d.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, { //sem detalhes, evitar alertas terminar
    /* useNewUrlParser: true,
    useCreateIndex: true */
    useUnifiedTopology: true 
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo.');
});
mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
});

app.get('/', requireAuth, (req, res) => { //verificar e dps continua com acesso
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});