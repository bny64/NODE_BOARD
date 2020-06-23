const {sequelize} = require('../models');
sequelize.sync();

const {User} = require('../models');

const testFunc = async () => {
    try{
        const email = 'bny64@naver.com';
        const result = await User.findOne({where : {email}});
        console.log(result);
    }catch(err){
        console.error(err);
    }
    
};

testFunc();