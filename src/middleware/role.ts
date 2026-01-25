import { NextFunction, Response } from "express"
import { UserRole } from "../model/userModel"
import { AuthRequest } from "./auth"

export const requireRole = (role : UserRole[]) =>{
    return(req:AuthRequest , res:Response , next:NextFunction)=>{
       if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        } 

        const userRole = req.user.role;

        const hasRole = userRole?.some((r: UserRole) => role.includes(r))
        if(!hasRole){
            return res.status(403).json({
                message: `Require ${role} role`
            })
        }
        next()
    }
}