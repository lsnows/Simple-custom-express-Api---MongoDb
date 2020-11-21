//Fazendo o mongoose criar esse model, o Mongo já irá ter todas essas propriedades automaticamente.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ //vai dizer ao mongoose sobre as diferentes propiedades que todo usuario vai ter dentro do "user's collection"
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

mongoose.model('User', userSchema); //associa com o mongoose libray