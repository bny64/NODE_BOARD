const fs = require('fs');
require('dotenv').config();
const rootPath = require('app-root-path').path;
const Client = require('ssh2-sftp-client');
const uuid = require('uuid/v4');

let sftp = new Client();

class FileUtil {

    async saveDateFiles(type, requestMap) {

        const fileList = [];
        const files = [];

        let idx = 1;
        let filePath = this.parseName(type);
        let filePathDate = '';

        for (let element in requestMap.files) {
            files.push(requestMap.files[element]);
        }

        let month = String(new Date().getMonth());
        let dateSplit = [new Date().getFullYear(), month.length > 1 ? Number(month) + 1 : '0' + (Number(month) + 1)];

        try {

            await sftp.connect({
                host: process.env.FILE_SERVER_IP,
                port: process.env.FILE_SERVER_PORT,
                username: process.env.FILE_SERVER_ID,
                password: process.env.FILE_SERVER_PASSWORD
            });

            for (let i = 0; i < dateSplit.length; i++) {
                filePath += '/' + dateSplit[i];
                filePathDate += '/' + dateSplit[i];
            }

            const dirChk = await sftp.exists(filePath);

            if (!dirChk) {
                console.log('directory not found. make a new deirectory');
                await sftp.mkdir(filePath, true);
            }

            for (let i = 0; i < files.length; i++) {

                let orgFileName = files[i].name;
                let ext = orgFileName.substring(orgFileName.lastIndexOf("."));
                let fileName = dateSplit.join('') + '_' + uuid() + ext;

                let data = requestMap.files.boardFile.data;

                sftp.put(data, filePath + '/' + fileName).catch(err => {
                    throw err;
                });

            }

        } catch (err) {
            throw err;
        } finally {
            sftp.end();
        }
    }

    parseName(number) {

        let name = '';
        let path = '';
        const filePathInfo = JSON.parse(fs.readFileSync(rootPath + '/properties/filePath.json', 'utf8')).pathInfo;

        switch (number) {
            case 'imgThumbTemp_1':
                name = 'boardImgTempPath';
                break;
            case 'imgFile_1':
                name = 'boardImgFilePath';
                break;
            case 'imgFileThumb_1':
                name = 'boardImgFileThumbPath';
                break;
            case 'imgFileThumbUrl_1':
                name = 'boardImgFileThumbUrl';
                break;
            default:
                break;
        }

        for (let element in filePathInfo) {
            if (name === element) {
                path = filePathInfo[element];
                break;
            }
        }

        return path;

    }
}

module.exports = new FileUtil();