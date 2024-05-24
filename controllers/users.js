const {prisma} = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//вход
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //заполнены ли все поля
        if(!email || !password) {
            return res.status(400).json({ message:'Пожалуйста, заполните обязытельные поля'}) 
        }
        
        //пользователь с таким email
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });
    
        const isPasswordCorrect = user && (await brypt.compare(password, user.password));
        const secret = process.env.JWT_SECRET;
    
        //вход пользователя
        if(user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({message: 'Неверно введен логин или пароль'})
        }
    } catch {
        return res.status(500).json({message:'Что-то пошло не так'});
    }
}

//регистрация
const register = async (req, res) => {
    try{
        const {email, password, name} = req.body;
        
        //заполнены ли все поля
        if (!email || !password || !name) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'})
        }
    
        //существует ли пользователь с таким email
        const registeredUser = await prisma.user.findFirst({
            where :{
                email
            }
        });
    
        if (registeredUser) {
            return res.status(400).json({massage: 'Пользователь с таким email уже существует'})
        }
    
        //хэширование пароля и создание пользователя
        const salt = await brypt.genSalt(10);
        const hashedPassword = await brypt.hash(password, salt);
    
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });
    
        const secret = process.env.JWT_SECRET;
    
        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({message:'Не удалось создать пользователя'});
        }
    } catch{
        return res.status(500).json({message:'Что-то пошло не так'});
    }
}

//текущий пользователь
const current = async (req, res) => {
    res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    current
}