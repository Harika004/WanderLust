// module.exports = (fn)=>{
//     return (req,res,next)=>{
//         fn().catch(next);
//     }
// }


const wrapAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
    };
  };
  
module.exports = wrapAsync;
