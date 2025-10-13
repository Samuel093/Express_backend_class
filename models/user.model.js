import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email is unique'],
    },
    role: {
        type: String,
        enum: ['Admin', 'Tutor', 'Student']
    }
},{
    timestamps: true
})

const userModel = mongoose.model('userModel', userSchema)

export default userModel