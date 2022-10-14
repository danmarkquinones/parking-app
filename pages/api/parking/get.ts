import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import Parking from '../../../models/Parking.model'

// type ParkingData = {
//     name:String,
//     distance : Array,
//     size:String,
//     occupied:Boolean,
//     occupiedBy:String
// }

export default async function Get(req :  NextApiRequest ,res : NextApiResponse){
    try{
        await connectMongo()
        const parkings = await Parking.find()
        res.status(200).json({
            message:"Parking list" ,
            data:parkings
        })
    } catch(e){
        res.status(500).json({
            message:e
        })
    }
}