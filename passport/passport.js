require('dotenv').config();
const ACCESS_AUTHORITY = process.env.ACCESS_AUTHORITY.split(',');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const bcrypt = require('bcrypt');
const msgBox = require('../common/msgBox/msg');
const errorMsgBox = require('../common/msgBox/errorMsg');
const loginLog = require('../common/log/logService');
const interceptor = require('../common/inteceptor/interceptor');

const UserService = require('../service/userService');
const UserAuthorityService = require('../service/userAuthorityService');

const cookieExtractor = (req) => {

    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;

};

module.exports = () => {
    
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwortField : 'password'
    }, async (email, password, done) => {

        try{

            const user = await UserService.selectByEmail(email);
            //email에 해당하는 유저가 있다면
            
            if(user){

                //비밀번호 체크
                let result = await bcrypt.compare(password, user.password.replace('{bcrypt}', ''));

                //비밀번호 일치시
                if(result){

                    //권한체크
                    let authority = await UserAuthorityService.selectAuthById(user.id);
                    result = false;

                    //권한확인
                    for(let index in ACCESS_AUTHORITY){
                        if(authority.authority.indexOf(ACCESS_AUTHORITY[index]) > -1){
                            result = true;
                            break;
                        }
                    }

                    //권한이 있으면
                    if(result){
                        //로그 남기기
                        loginLog.insertLog(user);
                        return done(null, user, {message : msgBox.SelectSuccess});
                    //권한이 없으면
                    } else{
                        done(null ,false, {message : errorMsgBox.NoAuthorities});
                    } 

                }else{                   
                //비밀번호 틀렸을 시
                    done(null, false, {message : errorMsgBox.BadCredentials});
                }

            }else{
            //해당하는 유저가 없을 시
                done(null, false, {message : errorMsgBox.BadCredentials});            
            } 

        }catch(error){            
            return done(error);
        }

    }));

    passport.use(new JwtStrategy({

        jwtFromRequest : cookieExtractor,
        secretOrKey : process.env.JWT_SECRET

    }, async (payload, done) => {
        
        try{

            const result = await UserService.selectByEmail(payload.email);

            if(result) return done(null, result);                
            else return done(null, false);

        }catch(error){
            return done(error, false);
        }

    }));

}
