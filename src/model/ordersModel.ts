import mongoose from "mongoose";

export interface IOrders extends Document{
    _id : mongoose.Types.ObjectId,
    email : string,
    username : string,
    address:string,
    paymentMethod:string,
    orderDate : string,
    itemName : string,
    amount:string,
    price : string,
    qty : number,
    size : string,
    description : string,
    status : string,
    creatAt? : Date,
    updatedAt? : Date

}

const ordersSchema = new mongoose.Schema<IOrders>({
    email : {type:String , required:true},
    username : {type:String , required:true},
    address : {type:String , required:true},
    paymentMethod : {type:String , required:true},
    orderDate : {type:String , required:true},
    itemName : {type:String , required:true},
    amount : {type:String , required:true},
    price : {type:String , required:true},  
    qty : {type:Number , required:true},
    size : {type:String , required:true},
    description : {type:String , required:true},
    status: {
        type: String,
        enum: ["pending", "success", "cancelled"],
        default: "pending",
    },
},{
    timestamps:true
})

export const Orders = mongoose.model<IOrders>("orders", ordersSchema)