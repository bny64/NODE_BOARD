const express = require('express');
const router = express.Router();

const wrapAsync = require('../common/util/wrapAsync');
const boardService = require('../service/boardService');
const fileUtil = require('../common/util/fileUtil');
const layoutUtil = require('../common/util/layoutUtil');
const msgBox = require('../common/msgBox/msg');


router.get('/boardList.do', wrapAsync(async(req, res, next) => {

    try{
        
        const returnVal = req.commandMap;
        const layoutInfo = layoutUtil.getLayout(req);
        Object.assign(returnVal, layoutInfo);
    
        res.render(layoutInfo.layoutName, returnVal);

    }catch(error){
        throw error;
    }

}));

router.post('/boardList.do', wrapAsync(async(req, res, next) => {

    try{
        
        const returnVal = req.commandMap;

        const parameters = req.commandMap.get('params');
        let thumbPath = fileUtil.parseName('imgFileThumbUrl_1');
                
        const boards = await boardService.getBoardList(parameters);

        for(let i=0; i<boards.length; i++){

            const board = boards[i];
            let fileName = board.fileName;

            if(fileName){
                board.thumbImgFilePath = thumbPath + '/file';
            }else{
                board.thumbImgFilePath = thumbPath + '/dflt';
                board.thumbFileName = 'default.jpg';
            }

        }

        returnVal.boards = boards;

        returnVal.msgCode = msgBox.SelectSuccess[0];
        returnVal.msg = msgBox.SelectSuccess[1];

        res.send(returnVal);

    }catch(error){
        throw error;
    }

}));

router.post('/getNumOfBoards.do', wrapAsync(async(req, res, next)=>{

    try{

        const returnVal = req.commandMap;

        const max = await boardService.getNumOfBoards();

        returnVal.boardCnt = max;
        returnVal.msgCode = msgBox.SelectSuccess[0];
        returnVal.msg = msgBox.SelectSuccess[1];

        res.send(returnVal);

    }catch(error){

        throw error;
    }

}))

router.get('/registBoard.do', wrapAsync(async(req, res, next)=>{
    
    try{
        
        const returnVal = req.commandMap;
        const layoutInfo = layoutUtil.getLayout(req);
        Object.assign(returnVal, layoutInfo);
    
        res.render(layoutInfo.layoutName, returnVal);

    }catch(error){
        throw error;
    }
    
}));

router.post('/registBoard.do', wrapAsync(async(req, res, next)=>{

    fileUtil.saveDateFiles('imgFile_1', req);


}));

module.exports = router;