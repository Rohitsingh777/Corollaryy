const jwt = require('jsonwebtoken');
const SECRET = 'lsfjoi_priyakpofawjep_ojfo';  // This should be in an environment variable in a real application

const authJwt = (req,res,next)=>{
const authhead = req.headers.authorization ;

if (authhead) {
const token = authhead.split(' ')[1];
jwt.verify(token,SECRET,(err,user)=>{
    if (err){
        return res.sendStatus(403);
    }
    req.user = user ; 
    next();
})
}
else res.sendStatus(401);
}


module.exports ={
    authJwt , SECRET 
}


