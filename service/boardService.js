const {Board} = require('../models');

class BoardService {
    async getBoardList(params){
        
        let page = params.page;
        let pageSize = params.pageSize;

        const boards = await Board.findAll({
            attributes:['listNo','id','name','createdAt','updatedAt', 'contents', 'title', 'imgFilePath', 'fileName', 'thumbImgFilePath', 'thumbFileName', 
            'orgFileName', 'passwordYn', 'viewYn'],
            offset:pageSize * (page - 1),
            limit : pageSize,
            order : [['createdAt', 'DESC']],
            where : {
                viewYn : 'Y'
            }
        });

        return boards;

    }

    async getNumOfBoards(params){

        const max = await Board.count({
            where : {
                viewYn : 'Y'
            }
        })
        
        return max;
        
    }
}

module.exports = new BoardService();