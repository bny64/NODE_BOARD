const debug = require('debug')('filter');
const CommandMap = require('./commandMap');

module.exports = (req, res, next) => {
    debug('**********commonFilter**********');    
    const commandMap = new CommandMap();
    const contentType = req.headers['content-type'];

    if(contentType){
        if(contentType.indexOf('application/json') > -1){
            
            const parameters = req.body;
            commandMap.set('params', parameters);

            req.commandMap = commandMap;    

        }else if(contentType.indexOf('application/x-www-form-urlencoded') > -1){

            const parameters = req.body;
            commandMap.set('params', parameters);

            req.commandMap = commandMap;    

        }
    }else{
        req.commandMap = commandMap;
    }

    if(req.cookies.userName){
        commandMap.cookieUserName = req.cookies.userName;
        commandMap.jwt = req.cookies.jwt;
    }

    next();

};