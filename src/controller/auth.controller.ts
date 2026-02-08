import { Request , Response} from "express" 
import { IUser, User } from "../model/userModel"
import bcrypt from "bcryptjs"
import { signAccessToken } from "../util/token"
import { AuthRequest } from "../middleware/auth"
import jwt from "jsonwebtoken"


export const registerUser =async (req:Request , res:Response)=>{
    const {username , password , email , role} = req.body

    if(!username || !password || !email){
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({ message: "Email alrady registered" })
    }

    const hasheedPassword = await bcrypt.hash(password,10)

    const newUser = new User({
        username,
        password:hasheedPassword,
        email,
        role : [role]
    })

    await newUser.save()

    res.status(201).json({
      message:"User Register Successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        roles: newUser.role,
      }
    })
}

export const loginUser = async(req:Request , res:Response)=>{
    const {email , password} = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials Please Try again Later" })
    } 

    const valid = await bcrypt.compare(password, existingUser.password)
    
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials Please Try again Later" })
    }

    const accessToken = signAccessToken(existingUser)

    res.status(200).json({
        message : "success",
        data:{
            email : existingUser.email,
            role : existingUser.role,
            accessToken
        }
    })
}


export const getMyDetails = async(req:AuthRequest , res:Response)=>{
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const userId = req.user.sub
    const user =
        ((await User.findById(userId).select("-password")) as IUser) || null

    if (!user) {
        return res.status(404).json({
        message: "User not found"
        })
    }

    const { username, email, role} = user

    res.status(200).json({
        message: "Ok",
        data: { username, email, role }
    })
}
