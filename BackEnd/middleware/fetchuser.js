const jwt = require("jsonwebtoken");
const JWT_SECRET = "jai@shree&krishna$radheradhe";

module.exports =  ()=>{
    return async (req, res, next) => {
        console.log("inside middle")
      //get user for jwt tocken and add id to the object
      const token = req.header("auth-tocken");
      if (!token) {
        res.status(401).send({ error: "please authenticate using valid tocken" });
      }
      try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
      } catch (error) {
        res.status(401).send({ error: "please authenticate using valid tocken" });
        next(error);
      }
}
};
// module.export = fetchuser;
