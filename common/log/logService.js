const mysql = require('mysql2');
const config = require('../../config/dbConfig.json');
const debug = require('debug')('log');
const connection = mysql.createConnection({
    host : config.development.host,
    user :config.development.username,
    password : config.development.password,
    database : config.development.database
})

class mysqlConnect {
    insertLog(userInfo){
        connection.connect();
        const queryString = `INSERT INTO loginLog(id, joinType, name) VALUES(?, ?, ?)`;
        const params = [userInfo.id, userInfo.joinType, userInfo.name];
        connection.query(queryString, params, (err, rows, fields)=>{
            if(!err){
                debug('Log is wirtten');
            }else{
                console.error(err);
                debug('error!!!!!!!!!!');
            }
        });
    }
}

module.exports = new mysqlConnect();