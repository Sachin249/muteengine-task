 const express = require('express');
 const router = express.Router();
 const jwt = require('jsonwebtoken');
 const config = require("../config/jwtconfig")
 const users= require('../models/user');
 
 router.use(function (req, res, next) {
        var token = req.headers['x-access-token'];
        // console.log(token)
        if (token) {
                jwt.verify(token, config.usersecretKey,
                {
                algorithm: config.algorithm
                
                },async function (err, decoded) {
                if (err) {
                        let errordata = {
                        message: err.message,
                        expiredAt: err.expiredAt
                        };
                        // console.log(errordata);
                        return res.status(500).json({
                        message: 'Unauthorized Access'
                        });
                }
                req.decoded = decoded;
                const getData = await users.findById(decoded.id).exec();
                if(getData && token == getData.remember_token){
                    next(); 
                } else {
                    return res.status(500).json({
                    message: 'Token Mismatch'
                    });  
                }
                
                });
        } else {
                return res.status(500).json({
                message: 'Forbidden Access'
        });
        }
 });
 
 module.exports = router;