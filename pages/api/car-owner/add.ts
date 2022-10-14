import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import CarOwner from '../../../models/CarOwner.model'


export default async function Add(req :  NextApiRequest ,res : NextApiResponse){
    try{
        await connectMongo()
        const newCarOwner = await CarOwner.create(req.body)
        res.status(200).json({
            message:"Registered Successful" ,
            data:newCarOwner
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:e
        })
    }
}