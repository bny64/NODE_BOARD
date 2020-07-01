const passport = require('passport');
//passport를 통과시킬 제외 url 리스트
const excludeList = ['/board/boardList.do'];

module.exports = function(req, res, next){

    let check = false;

    for(let i=0; i<excludeList.length; i++){
        
        if(req.originalUrl===excludeList[i]){

            if(req.method==='POST'){
                check = true;
                break;
            }            
        } 
    }

     if(!check){        
        passport.authenticate('jwt', {session:false}, function(err, user){
            if(user){
                next();
            }else{
                res.redirect('/auth/login.do');
            }  
         })(req, res, next); //callback 함수를 안타서 함수 뒤에 req, res, next추가해서 해결
     }else{
        next();    
     } 

};