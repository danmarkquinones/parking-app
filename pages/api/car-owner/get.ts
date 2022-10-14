import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import CarOwner from '../../../models/CarOwner.model'


export default async function Get(req :  NextApiRequest ,res : NextApiResponse){
    try{
        await connectMongo()
        const carOwners = await CarOwner.find()
        res.status(200).json({
            message:"Car owners" ,
            data:carOwners
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            message:e
        })
    }
}