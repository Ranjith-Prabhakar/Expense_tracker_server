const jwt = require('jsonwebtoken');
const ErrorObject = require('../utils/ErrorObject');
require('dotenv').config();

const getToken = (user) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust payload as needed
    console.log("token:", token);

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    // Handle the error appropriately; for instance, throw a custom error
    throw new ErrorObject(500, "internal error");
  }
};

module.exports = { getToken };
