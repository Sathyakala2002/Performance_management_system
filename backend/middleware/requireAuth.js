const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1] + "";
  console.log("token",token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals = decoded;
    req.token = token;
    next();
    console.log("decode token",decoded);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { requireAuth };
