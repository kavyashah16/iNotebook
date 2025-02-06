const jwt = require('jsonwebtoken');
const JWT_SECRET = 'crazyboy'

const fetchUser = (req, res, next) => {
    const token = req.header("authtoken");
    if(!token){
        res.status(401).send({error: "Authenticate using valid token"})
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();        
    } catch (error) {
        res.status(401).send({error: "Authenticate using valid token"})
    }
   
}

module.exports = fetchUser;