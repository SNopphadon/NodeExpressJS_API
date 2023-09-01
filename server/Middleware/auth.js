var jwt = require('jsonwebtoken');
const secret = '@2G4#Y7!t0z2$4S6&8*01P3KA%7BN1X3'
const auth = async(req,res,next)=>{
    try{
        const authHeader  = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: 'Authentication failed. No token provided.' });
        }

        const [_, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed. No token provided.' });
        }
        var decoded = jwt.verify(token, secret);
        // res.json({status:'ok',decoded})
        req.user = decoded;
        next();

    }catch(e){
        return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
};
module.exports = auth;