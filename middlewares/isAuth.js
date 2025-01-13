const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = (req, res, next) => {
  try {
    //check if the user is authenticated
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) throw new Error("Unauthenticated");
    //return res.status(401).json({message:'Unauthorized'});
    const token = authorizationHeader.split(" ")[1];
    //verify the token
    const decodedToken = jwt.verify(token, "processenvJWT_SECRET");
    //if token is verified
    if (!decodedToken) throw new Error("Unauthorized");
    //return res.status(401).json({message:'Unauthorized'});

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ Error: err.message });
  }
};

module.exports = isAuth;
