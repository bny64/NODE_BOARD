const debug = require('debug')('error');

module.exports = class SqlError{
    constructor(){
        debug('**********SQL ERROR**********');
        this.error = 'SqlError';
    }
    
}