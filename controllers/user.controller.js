import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { Resend } from "resend";
import { sendEmail } from "../utils/sendEmail.js";

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { name, password, email, role } = body;
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = new userModel({
      name,
      password: hashPassword,
      email,
      role,
    });
    await user.save();
    return res.status(200).json({
      message: "Successfully created user",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_KEY, {
      subject: "accessToken",
      expiresIn: process.env.EXPIRATION,
    });

    return res.status(200).send(accessToken);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const fetchUser = async (req, res) => {
  try {
    // const user = await userModel.find().populate('admin', '-_id -__v -createdAt -updatedAt')
    const user = await userModel.find();
    if (user.length === 0) {
      return res.status(400).json({
        message: "No user found in database",
      });
    }
    return res.status(200).json({
      message: "All users fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const readUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "No user matched",
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const clearUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({
        message: "Cannot delete non existent user",
      });
    }
    return res.status(200).json({
      message: "User deleted successufully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await userModel.deleteMany();
    if (user.deletedCount === 0) {
      return res.status(400).json({
        message: "No users to delete",
      });
    }
    return res.status(200).json({
      message: "Users deleted successufully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await userModel.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
      return res.status(400).json({
        message: "Cannot update non existent user",
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    const startTime = new Date (Date.now())

    await sendEmail({ email, otp });
    (user.otp = otp), (user.otpExpiry = startTime);

    await user.save();

    return res.status(200).json({ message: "OTP already sent to email" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { otp, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user.otp === null || user.otpExpiry === null) {
      return res.status(400).json({
        message: "No OTP sent",
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        message: "Incorrect OTP",
      });
    }
    const currentTime = new Date(Date.now())

    const timegap = currentTime - user.otpExpiry

    const timegapInMinutes = timegap / (1000 * 60)


    if(timegapInMinutes >= 15){
      return res.status(400).json({
        message: "OTP expired, request for new one"
      })
    }
    
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createUser,
  loginUser,
  fetchUser,
  readUser,
  clearUser,
  removeUser,
  addUser,
  forgetPassword,
  resetPassword,
};
