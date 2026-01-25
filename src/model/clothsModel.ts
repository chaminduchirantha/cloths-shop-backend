import mongoose, { Schema } from "mongoose"

export interface ICloths extends Document{
    _id:mongoose.Types.ObjectId
    itemName :string
    price : string 
    description : string
    itemCategory : string
    imageUrl : string
    size: string
    creatAt? : Date
    updatedAt? : Date
}

const clothsSchema = new Schema<ICloths>({
    itemName :{type:String , required:true},
    price : {type:String , required:true},
    description : {type:String , required:true},
    itemCategory : {type:String , required:true},
    imageUrl : {type:String , required:true},
    size: {type:String, required:true},
},{
    timestamps:true
})

export const Cloths = mongoose.model<ICloths>("Cloths", clothsSchema)