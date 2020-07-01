const {UserAuthority} = require('../models');

class UserAuthorityService {    
    async selectAuthById(id){
        const userAuth = await UserAuthority.findOne({where : {id}});
        return userAuth;
    }
    async saveAuth(auth){
        await UserAuthority.create(auth);    
    }
    
}

module.exports = new UserAuthorityService();