const constants=require('../error.constants')
const errorHandler=(err,req,res,next)=>{
    let statusCode = res.statusCode || 500;

    switch(statusCode){
        case constants.constants.FORBIDDEN:
            res.status(403).json({title:"You are not authorized",message:err.message,StackTree:err.stack})
            break;
        case constants.constants.BAD_REQUEST:
            res.status(400).json({title:"Bad request",message:err.message,StackTree:err.stack})
            break;
        case constants.constants.INTERNAL_SERVER:
            res.status(500).json({title:"Internal server error",message:err.message,StackTree:err.stack})
            break; 
        case constants.constants.UNAUTHORIZED:
            res.status(401).json({title:"Invalid Credentials",message:err.message,StackTree:err.stack})
            break;
        case constants.constants.NOT_FOUND:
            res.status(404).json({title:"Requested resource not found",message:err.message,StackTree:err.stack})
            break;
        case constants.constants.CONFLICT:
            res.status(409).json({title:"Resource Conflict",message:err.message,StackTree:err.stack})
            break;
        default:
            res.status(500).json({
                title: "Unknown Error",
                message: err.message || "An unknown error occurred",
                StackTree: err.stack,
              });
    }
}
module.exports=errorHandler;