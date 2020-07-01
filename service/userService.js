const {User} = require('../models');

class UserService {    
    async selectById(id){
        const user = await User.findOne({where : {ids}});
        return user;
    }
    async selectByEmail(email){
        const user = await User.findOne({where : {email}});
        return user;
    }
    async join(user){
        await User.create(user);
    }
}

module.exports = new UserService();