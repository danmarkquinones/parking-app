import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import Parking from '../../../models/Parking.model'


export default async function Add(req :  NextApiRequest ,res : NextApiResponse){
    try{
        await connectMongo()
        const newParking = await Parking.create(req.body)
        res.status(200).json({
            message:"Parking Created" ,
            data:newParking
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:e
        })
    }
}