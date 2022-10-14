import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import Parking from '../../../models/Parking.model'
import mongoose from "mongoose"


export default async function Update(req :  NextApiRequest ,res : NextApiResponse){
    try{
        const parking = req.body

        console.log("from API" , parking)
        
        await connectMongo()

        if(!mongoose.Types.ObjectId.isValid(parking.parking_id)) return res.status(404).json({message:"NO PARKING WITH THAT ID"})
        
        const updatedParking = await Parking.findByIdAndUpdate(parking.parking_id,parking,{new:true})

        res.status(200).json({
            message:"Successfully updated a Parking",
            data:updatedParking
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:e
        })
    }
}