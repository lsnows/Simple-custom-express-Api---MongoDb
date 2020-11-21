const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer uhfdusahsauidsa'

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }

    const token = authorization.replace('Bearer ', ''); //pegando somente o token
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => { //payload = information stuck in to our Jason web token - Obj: { userId: user._id }
        if (err) {
            return res.status(401).send({ error: 'Your must be logged in.' });
        }

        const { userId } = payload;

        const user = await User.findById(userId); //mongoose vai olhar no MonboDb coleection um usuario com devido Id.
        req.user = user; //usar dados do usuario
        next();
    });
}