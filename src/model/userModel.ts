import mongoose, { Schema } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface IUser extends Document{
    _id : mongoose.Types.ObjectId
    username : string
    password:string
    email:string
    role:UserRole[]
}

const userSchema = new Schema<IUser>({
    username :{type:String , required:true},
    password :{type:String , required:true},
    email :{type:String , required:true, lowercase:true},
    role :{type:[String] , enum: Object.values(UserRole), default: [UserRole.USER]}
})

export const User = mongoose.model<IUser>("User" , userSchema)