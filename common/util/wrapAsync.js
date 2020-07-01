module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).then((result)=>{
         
        }).catch(next);
    }
};