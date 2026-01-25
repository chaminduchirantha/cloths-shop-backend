import { Request , Response} from "express" 
import { User } from "../model/userModel"
import bcrypt from "bcryptjs"
import { AsyncResource } from "node:async_hooks"
import { signAccessToken } from "../util/token"


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