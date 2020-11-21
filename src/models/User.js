//Fazendo o mongoose criar esse model, o Mongo já irá ter todas essas propriedades automaticamente.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', function(next) { //usnado keyword function para utilizar o This referente aqui dentro, e não array function que se refere ao contexto todo
    const user = this;
    if (!user.isModified('password')) { //não modificou password, faz nada.
        return next();
    };

    bcrypt.genSalt(10, (err, salt) => { //geral o salt e 10 é a complexidade
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => { //pegar usuario, salt gerado, ver se tem erro.. se nao tiver pega hash => e monta password
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

//comparar password providenciado pelo usuario contra o password no BD
userSchema.methods.comparePassword = function(candidatePassword) { //usnado keyword function para utilizar o This referente aqui dentro, e não array function que se refere ao contexto todo
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false); //password não bate
            }

            resolve(true);
        });
    });
};

mongoose.model('User', userSchema); //associa com o mongoose libray