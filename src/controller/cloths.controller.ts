import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { Cloths } from '../model/clothsModel';


export const createCloths = async (req:Request, res:Response) => {
    const {itemName, price, description, itemCategory, size} = req.body;

    let imageUrl = ""
    
    if (req.file) {
        const result: any = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
                {folder: "post"},
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
            upload_stream.end(req.file?.buffer)
        })
        imageUrl  = result.secure_url
    }

    const clothsDetails = new Cloths({
        itemName,
        price,
        description,
        itemCategory,
        size,
        imageUrl
    })

    await clothsDetails.save()
        res.status(201).json({message:"Cloths created successfully", clothsDetails
    })
}


export const getAll = async (req:Request, res:Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const cloths = await Cloths.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const total = await Cloths.countDocuments();
        return res.status(200).json({
            message: 'Cloths Details get Successful',
            data: cloths,
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page,
        });

    } catch (error: any) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


export const updateCloths = async(req:Request, res:Response) =>{
    try {
    const { id } = req.params;
    const { itemName, price, description, itemCategory, size } = req.body;

    const existingCloths = await Cloths.findById(id);
    if (!existingCloths) {
      return res.status(404).json({ message: "Cloths not found" });
    }

    let imageUrl = existingCloths.imageUrl;

    if (req.file) {
      const fileBuffer = req.file.buffer;
      const result: any = await new Promise((resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          { folder: "post" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        upload_stream.end(fileBuffer);
      });

      imageUrl = result.secure_url;
    }

    const updatedCloths = await Cloths.findByIdAndUpdate(
      id,
      {
        itemName,
        price,
        description,
        itemCategory,
        size,   
        imageUrl,
      },
      { new: true } 
    );

    res.status(200).json({
      message: "Cloths details updated successfully",
      data: updatedCloths,
    });

  } catch (error: any) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
}
