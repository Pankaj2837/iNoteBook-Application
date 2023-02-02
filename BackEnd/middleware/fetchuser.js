const jwt = require("jsonwebtoken");
const JWT_SECRET = "jai@shree&krishna$radheradhe";

const fetchuser = (req, res, next) => {
  //get user for jwt tocken and add id to the object
  const token = req.heder("auth-tocken");
  if (!token) {
    res.status(401).send({ error: "please authenticate using valid tocken" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using valid tocken" });
  }
};
module.export = fetchuser;
