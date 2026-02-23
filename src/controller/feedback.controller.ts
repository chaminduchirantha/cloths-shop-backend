import { Request, Response } from "express";
import { Feedback } from "../model/feedbackModel";


export  const createFeedback = async(req: Request, res: Response)=>{
    const {customername , email , feedback , ratings} = req.body

    if(!customername || !email || !feedback || !ratings){
        return res.status(400).json({ message: "All fields are required" })
    }

    const feedbackData = new Feedback({
        customername,
        email,
        feedback,
        ratings
    })

    await feedbackData.save()
    res.status(201).json({message:"Feedback created successfully", feedbackData})
}

export const getAllFeedback = async(req: Request, res: Response)=>{
try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const user = await Feedback.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Feedback.countDocuments();
        return res.status(200).json({
            message: 'Feedabck Details get Successful',
            data: user,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}