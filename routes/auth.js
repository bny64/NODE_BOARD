require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const UserService = require('../service/userService');
const UserAuthorityService = require('../service/userAuthorityService');

const wrapAsync = require('../common/util/wrapAsync');

const layoutUtil = require('../common/util/layoutUtil');
const msgBox = require('../common/msgBox/msg');

/* get */

router.get('/join.do', wrapAsync(async(req, res, next)=>{
    
    try{

        const returnVal = {};
        const layoutInfo = layoutUtil.getLayout(req);
        Object.assign(returnVal, layoutInfo);
        
        res.render(layoutInfo.layoutName, returnVal);

    }catch(error){
        throw error;
    }

}))

router.get('/login.do', wrapAsync(async(req, res, next)=>{

    try{

        const returnVal = {};
        const flashMsg = req.flash('message');
        if(flashMsg[0]) returnVal.msg = flashMsg[0];
        else returnVal.msg = '';

        const layoutInfo = layoutUtil.getLayout(req);    
        Object.assign(returnVal, layoutInfo);

        res.render(layoutInfo.layoutName, returnVal);

    }catch(error){
        throw error;
    }
    
}));

/* post */

router.post('/login.do', wrapAsync(async(req, res, next)=>{

    try{
        
        const returnVal = {};

        passport.authenticate('local', {session : false}, (error, user, msg)=>{
            
            if(error || !user){
                return res.status(401).send({msg : msg.message});
            }

            req.login(user, {session : false}, error=>{
                
                if(error) throw error;

                const tokenUser = {};
                Object.assign(tokenUser, {name : user.name, email : user.email});
                const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {expiresIn : '60m'});

                res.cookie('jwt', token, {path:'/', httpOnly:true, maxAge:1000*6*60});
                res.cookie('userName', user.name, {path:'/', httpOnly:true, maxAge:1000*6*60});
                res.json({token, msgCode : 'OK'});
                
            });
            
        })(req, res, next);

    }catch(error){
        throw error;
    }

}));

router.post('/logout.do', wrapAsync(async(req, res, next)=>{
    try{

        res.clearCookie('jwt');
        res.clearCookie('userName');

        res.redirect('/index.do');

    }catch(error){
        throw error;
    }
}));

router.post('/chkValId.do', wrapAsync(async(req, res, next)=>{
    
    try{
        const returnVal = {};
        const parameters = req.commandMap.get('params');
        
        const user = await UserService.selectById(parameters.id);

        if(!user){
            returnVal.msgCode = msgBox.ValidateId[0];
            returnVal.msg = msgBox.ValidateId[1];
        }else{
            returnVal.msgCode = msgBox.DuplicateId[0];
            returnVal.msg = msgBox.DuplicateId[1];
        }

        res.send(returnVal);
        
    }catch(error){
        throw error;
    }
    
}));

router.post('/chkValEmail.do', wrapAsync(async(req, res, next)=>{
    
    try{

        const returnVal = {};
        const parameters = req.commandMap.get('params');

        const user = await UserService.selectByEmail(parameters.email);

        if(!user){
            returnVal.msgCode = msgBox.ValidateEmail[0];
            returnVal.msg = msgBox.ValidateEmail[1];
        }else{
            returnVal.msgCode = msgBox.DuplicateEmail[0];
            returnVal.msg = msgBox.DuplicateEmail[1];
        }

        res.send(returnVal);

    }catch(error){
        throw error;
    }
    

}));

router.post('/join.do', wrapAsync(async(req, res, next)=>{
    
    try{

        const returnVal = {};
        const parameters = req.commandMap.get('params');
        let userKey = uuidv4(); //userKey를 uuid로 생성
        let password = '{bcrypt}' + await bcrypt.hash(parameters.password, 10);

        const user = {
            userKey,        
            email : parameters.email,
            emailYn : parameters.emailYn || null,
            id : parameters.id,
            imgPath : parameters.imgPath || null,
            introduce : parameters.introduce || null,
            joinType : 'NODEJS',        
            name : parameters.name,
            phoneNumber : parameters.phoneNumber || null,
            password,
            birth : parameters.birth || null
        }

        await UserService.join(user);
        await UserAuthorityService.saveAuth(user);

        req.flash('message', '가입에 성공했습니다. 로그인을 해주세요');

        res.redirect('/auth/login.do');

    }catch(error){
        throw error;
    }
    
}));

module.exports = router;