const UserModel = require("../models/user.model");
const { DecodeToken } = require("../service/Token.service");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedData = DecodeToken(token);

    if (!decodedData) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const user = await UserModel.findOne({ email: decodedData.email });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
