const userModel = require('../Models/userModel');
const ErrorObject = require('../utils/ErrorObject');
const mongoose = require('mongoose');

const addMembers = async ({ userId, userName, email }, next) => {
  try {
    // Convert userId string to ObjectId
    const userIdObject = new mongoose.Types.ObjectId(userId);

    // Find the user by userId
    const user = await userModel.findById(userIdObject);

    if (user) {
      // Construct member object with ObjectId
      const memberObject = { userName, email };

      // Update the user's members array using $addToSet to avoid duplicates
      const updatedUser = await userModel.findByIdAndUpdate(
        userIdObject,
        { $addToSet: { members: memberObject } }, // Add memberObject to members array
        { new: true } // To return the updated user document
      );
      return updatedUser; // Return the updated user
    } else {
      return next(new ErrorObject(400, "User not found"));
    }
  } catch (error) {
    console.error("Error in addMembers:", error);
    return next(new ErrorObject(500, "Internal Error"));
  }
};

module.exports = { addMembers };
