import mongoose from "mongoose"

const adminSchema =  mongoose.Schema({
   name: {
    type: String,
    required: [true, 'name is required'],
   },
   email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email must be unique'],
   },
   role: {
    type: String,
    enum: ['Admin', 'Tutor', 'Student']
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel"
   }
},{
    timestamp: true
})

const adminModel = mongoose.model('adminModel', adminSchema)

export default adminModel