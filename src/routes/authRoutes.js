const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User'); //usar User model

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user =  new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user.id }, 'MY_SECRET_KEY');
        res.send({ token: token });
    } catch (err) {
        return res.status(422).send(err.message);
    };

});

module.exports = router;