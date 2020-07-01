var express = require('express');
var router = express.Router();

const wrapAsync = require('../common/util/wrapAsync');

const layoutUtil = require('../common/util/layoutUtil');

/* GET home page. */
router.get('/index.do', wrapAsync(async (req, res, next) => {

  try{

    const returnVal = req.commandMap;
    const layoutInfo = layoutUtil.getLayout(req);

    Object.assign(returnVal, layoutInfo);
    res.render(layoutInfo.layoutName, returnVal);

  }catch(error){
    throw error;
  }

}));

module.exports = router;
