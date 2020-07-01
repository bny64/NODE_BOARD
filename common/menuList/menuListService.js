const {MenuList} = require('../../models');

class MenuListService {

    async getMenuList(urls){

        const menuList = [];

        let menu = await MenuList.findOne({
            where : {
                listNo : 1
            }         
        });

        menuList.push(menu);

        for(let i=0; i<urls.length; i++){
            
            menu = await MenuList.findOne({
                where : {
                    url : urls[i]
                }
            })

            menuList.push(menu);
        }
        
        return menuList;

    }

    async getMenuListAll(){

        return await MenuList.findAll();

    }

}

module.exports = new MenuListService();