const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUp
const signUpUser = async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return response.status(200).json({
        message: "user already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        const token = await jwt.sign(
          { id: newUser._id, email: newUser.email },
          "secret",
          { expiresIn: "24h" }
        );
        return response.status(201).json({
          message: "User created",
          user: newUser,
          token: token,
        });
      } else {
        return response.status(400).json({
          message: "user is not created",
        });
      }
    }
  } catch (error) {
    return response.status(400).json({
      message: "error occur",
    });
  }
};

module.exports = { signUpUser };
