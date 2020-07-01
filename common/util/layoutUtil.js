const fs = require('fs');
const rootPath = require('app-root-path').path;

class LayoutUtil {

    constructor(){

        this.layout = JSON.parse(fs.readFileSync(rootPath + '/views/layout.json', 'utf8'));

    }
    
    getLayout(request, url){
       
        let layoutInfo = {};

        const fullUrl = (request) ? request.originalUrl : url;

        if(fullUrl.indexOf('/auth') > -1){
            Object.assign(layoutInfo, this.layout.authLayout);
        }else if(fullUrl.indexOf('/index') > -1){
            Object.assign(layoutInfo, this.layout.layout1);            
        }else{
            Object.assign(layoutInfo, this.layout.layout2);
        } 
        
        layoutInfo.layoutBody += fullUrl.substring(0, fullUrl.lastIndexOf('.')).replace('.do', '');

        return layoutInfo;
        
    }
}

module.exports = new LayoutUtil();