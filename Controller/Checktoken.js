const jwt = require("jsonwebtoken");

const Checktoken = (req, res) => {
  try {
    //Get token from header
    const Token = req.headers.authorization;
    // verify jwt token
    jwt.verify(Token, process.env.JWT_SECRET_KEY);

    res
      .status(200)
      .json({ message: "token is vaild", status: true, token: Token });
  } catch (error) {
    //Send Error
    res
      .status(200)
      .send({ Error: error, Message: "Authorization Failed", status: false });
  }
};

module.exports = Checktoken;
