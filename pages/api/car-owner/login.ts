import { NextApiResponse ,NextApiRequest } from "next"
import connectMongo from '../../../utils/connect_db'
import CarOwner from '../../../models/CarOwner.model'


export default async function Login(req :  NextApiRequest ,res : NextApiResponse){
    try{
        const {username , password} = req.body
        await connectMongo()
        const user = await CarOwner.findOne({username , password})

        !user && res.status(404).json({message:"User not found"})

        res.status(200).json({
            message:"Logged In Successful" ,
            data:user
        })
    } catch(e:any){
        res.status(500).json({
            message:e
        })
    }
}