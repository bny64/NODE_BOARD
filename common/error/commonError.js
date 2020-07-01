const debug = require('debug')('error');

module.exports = class CommonError{
    constructor(){
        debug('**********COMMON ERROR**********');
        this.error = 'commonError';
    }
    
}