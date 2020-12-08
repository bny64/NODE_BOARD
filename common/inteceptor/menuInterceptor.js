const menuListService = require('../menuList/menuListService');

module.exports = async function(req, res, next){

    if(req.method!=='POST'){

        const setMenuList = _getMenuNames(req);

        const menuList = await menuListService.getMenuList(setMenuList);
        req.commandMap.menuList = menuList;
    
        const menuListAll = await menuListService.getMenuListAll();     
        req.commandMap.menuTree = _setMenuList(menuListAll);

    }

    next();
};

function _getMenuNames(request){

    const urls = request.originalUrl.split('/');
    const urlList = [];

    for(let i=1; i<urls.length; i++){
        urlList.push('/' + urls[i].replace('.do', ''));
    }

    return urlList;

}

function _setMenuList(menuList){

    const sortArray = [];    

    let maxDepth = Math.max.apply(Math, menuList.map((m)=> m.depth));    
    menuList.sort((a, b)=> a.depth>b.depth? 1 : a.depth<b.depth?-1:0);

    //for...of 그냥 사용해봄
    for(let element of menuList){

        if(element.viewYn==='N') continue;

        let depth = element.depth;

        if(!sortArray[depth-1]) sortArray.push([]);

        sortArray[depth-1].push(element);
    }

    for(let i=maxDepth; i>=1; i--){

        let eleArray = sortArray[i-1];

        if(i!==1){

            for(let j=0; j<eleArray.length; j++){

                let eleJSON = eleArray[j];
                let upArray = sortArray[i-2];

                for(let k=0; k<upArray.length; k++){

                    let upJSON = upArray[k];
                    if(upJSON.listNo===eleJSON.parentListNo){

                        if(!upJSON.children) upJSON.children = [];

                        upJSON.children.push(eleJSON);

                    }

                }

            }

        }

    }

    return sortArray[0][0];

}