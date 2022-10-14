import mongoose, { Schema , model , models } from "mongoose";

const parkingSchema = new Schema({
    name:String,
    distance : Array,
    size:String,
    occupied:Boolean,
    occupiedBy:String //carId
})

const Parking = models.Parking || model('Parking' , parkingSchema)

export default Parking;