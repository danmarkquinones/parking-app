import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import CarOwner from '../../../models/CarOwner.model'
import mongoose from "mongoose"


export default async function Update(req :  NextApiRequest ,res : NextApiResponse){
    try{
        const user = req.body
        
        await connectMongo()

        if(!mongoose.Types.ObjectId.isValid(user.user_id)) return res.status(404).json({message:"NO USER WITH THAT ID"})
        
        const updatedUser = await CarOwner.findByIdAndUpdate(user.user_id,user,{new:true})

        res.status(200).json({
            message:"Successfully updated a User",
            data:updatedUser
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:e
        })
    }
}