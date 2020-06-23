const reqlib = require('app-root-path');
require('dotenv').config({path:reqlib+'\\.env'});
const Client = require('ssh2-sftp-client');

(async function(){

    const config = {
        host : process.env.FILE_SERVER_IP,
        port : process.env.FILE_SERVER_PORT,
        username : process.env.FILE_SERVER_ID,
        password : process.env.FILE_SERVER_PASSWORD    
    }
    
    const sftp = new Client('example-client');
    await sftp.connect(config);
    const result = await sftp.exists('/home/bny01/tripleProject/commonFile/boardImgFile/');
    console.log(result);
    await sftp.end();    
    

    
})();