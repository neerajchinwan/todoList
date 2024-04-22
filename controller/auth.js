const model = require('../model/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { User } = model;

let privateKey;
fs.readFile(path.resolve(__dirname,'../private.key'),'utf-8', (err, data) => {
    privateKey = data;
})

let publicKey;
fs.readFile(path.resolve(__dirname, '../public.key'), 'utf-8', (err, data) => {
    publicKey = data;
})






exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password.toString(), salt);
        newUser.password = hash
        const token = await jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
        newUser.token = token
        await newUser.save();

        const data = JSON.parse(JSON.stringify(newUser));
        delete data.password;

        res.status(201).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.login = async(req, res)  => {
    const password = req.body.password.toString();
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json({
                status: 'fail',
                error: 'Wrong credential'
            })
        }
        const isPassMatch =  await bcrypt.compare(password, user.password);
        if(!isPassMatch){
            return res.status(404).json({
                status: 'fail',
                error: 'Password is incorrect'
            })
        }

        const token =  await jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });

        res.status(200).json({
            status: 'success',
            data: token
        })


    }catch(error){
        res.status(404).json({
            status: 'fail',
            error
        })
    }
}

exports.protect = async (req, res, next) => {
    try{
        const token = req.get('authorization');
        if(!token){
            return res.status(400).json({
                status: 'fail',
                error: 'User not logged in'
            })
        }
        const authToken = token.split('Bearer ')[1];
        const isValidUser = await jwt.verify(authToken, publicKey);

        req.body.user = isValidUser.email;
        next()
        
    }catch(error){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}