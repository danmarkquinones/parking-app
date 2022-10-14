import mongoose, { Schema , model , models } from "mongoose";

const carOwnerSchema = new Schema({
    username : String,
    password : String,
    parking_slot_id : String,
    size: String,
    time_log : Array, //0 index start - n index exit
    invoice : Number
})

const CarOwner = models.CarOwner || model('CarOwner' , carOwnerSchema)

export default CarOwner;