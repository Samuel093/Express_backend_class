import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createUser = async (req, res) =>{
    try {
    const { body } = req
    const { name, password, email, role } = body
    const saltRounds = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const user = new userModel({
      name,
      password: hashPassword,
      email,
      role
    })
    await user.save()
    return res.status(200).json({
          message: "Successfully created user",
          data: user
    })
  } catch (error) {
      return res.status(500).json({
        message: error.message
      })
  }
}

const loginUser = async (req, res) =>{
    try {
    const { body } = req
    const { email, password } = body
    const user = await userModel.findOne({ email })
    if(!user){
      return res.status(404).json({
        message: "User does not exist"
      })
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if(!comparePassword){
      return res.status(400).json({
          message: "Invalid Credentials",
      })
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_KEY, { subject: "accessToken", expiresIn: process.env.EXPIRATION })

    return res.status(200).send(accessToken)
  } catch (error) {
      return res.status(500).json({
        message: error.message
      })
  }
}


const fetchUser = async (req, res) =>{
    try {
      // const user = await userModel.find().populate('admin', '-_id -__v -createdAt -updatedAt')
    const user = await userModel.find().select('name role password')
    if (user.length === 0){
      return res.status(400).json({
        message: "No user found in database"
      })
    }
    return res.status(200).json({
      message: "All users fetched successfully",
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
    
  }
}

const readUser = async (req, res) =>{
    try {
    const { id } = req.params
    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({
        message: "No user matched"
      })
    }
    return res.status(200).json({
      message: "User fetched successfully",
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const clearUser = async (req, res) =>{
    try {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    if(!user){
      return res.status(400).json({
        message: "Cannot delete non existent user"
      })
    }
    return res.status(200).json({
      message: "User deleted successufully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const removeUser = async (req, res) =>{
    try {
    const user = await userModel.deleteMany()
    if(user.deletedCount === 0){
      return res.status(400).json({
        message: "No users to delete"
      })
    }
    return res.status(200).json({
      message: "Users deleted successufully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const addUser = async (req, res) =>{
    try {
    const { id } = req.params
    const { body } = req
    const user = await userModel.findByIdAndUpdate(id, body, { new: true})
    if(!user){
      return res.status(400).json({
        message: "Cannot update non existent user"
      })
    }
    return res.status(200).json({
      message: "User updated successfully",
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export { createUser, loginUser, fetchUser, readUser, clearUser, removeUser, addUser }