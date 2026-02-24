import { Request, Response } from "express";
import { Orders } from "../model/ordersModel";

export const saveOrder=async(req:Request , res:Response)=>{
   try {
        const {
        email,
        username,
        address,
        paymentMethod,
        orderDate,
        itemName,
        amount,
        price,
        qty,
        size,
        description,
        } = req.body;

        if(!email || !username || !address || !paymentMethod){
            return res.status(400).json({ message: "All fields are required" })
        }

        const newOrder = new Orders({
        email,
        username,
        address,
        paymentMethod,
        orderDate,
        itemName,
        amount,
        price,
        qty,
        size,
        description,
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
        message: "Order saved successfully",
        data: savedOrder,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Server error",
        });
    }
}

export const getAllOrders = async (req:Request , res:Response)=>{
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const orderFish = await Orders.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Orders.countDocuments();
        return res.status(200).json({
            message: 'Orders Details get Successful',
            data: orderFish,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}