const jwt = require('jsonwebtoken');
const {prisma} = require('../prisma/prisma-client');

//текущий пользователь
const auth = async(req, res, next) => {
    try{
        let token = req.headers.authorization?.split(' ')[1];       //берем токен

        const decoded = jwt.verify(token, process.env.JWT_SECRET)   //декодируем в id

        //пользователь с таким id
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

    req.user = user;

    next();
    } catch (error) {
        res.status(401).json({message: 'Пользователь не авторизован'});
    }
}

module.exports = {
    auth
}