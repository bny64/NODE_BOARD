const debug = require('debug')('models');
debug('**********models\'index is started**********');

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/dbConfig.json')[env];
const ip = require('ip');
const db = {};

if( ip.address().indexOf('10.4.0.4') < 0){        
    config.host = '49.247.211.93';
}

debug(`address is : ${ip.address()}`);
const sequelize =  new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.MenuList = require('./menuList')(sequelize, Sequelize);
db.UserAuthority = require('./userAuthority')(sequelize, Sequelize);
db.LoginLog = require('./loginLog')(sequelize, Sequelize);

//definition of table's relationship
db.User.hasMany(db.Board, {
    foreignKey : 'userKey',
    sourceKey : 'userKey',
    onDelete : 'cascade'
});


db.User.hasOne(db.UserAuthority, {
   foreignKey : 'id' 
});

module.exports = db;
/**
 * var module = {exports : {}};
 * var exports = module.exports;
 * 
 * return module.exports;
 */