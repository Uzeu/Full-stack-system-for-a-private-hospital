
import { time } from "console";
import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Zakazan = new Schema({
    user: {
        type: String
    },
    lekar: {
        type: String
    },
    specialization: {
        type: String
    },
    pregled: {
        type: String
    },
    office: {
        type: String
    },
    type: {
        type: Number
    },
    year:{
        type:Number
    },
    month:{
        type:Number
    },
    day:{
        type:Number
    },
    hour:{
        type: Number
    },
    minute:{
        type:Number
    },
    duration:{
        type:Number
    },
    report:{
        type: String
    },
    reason:{
        type: String
    },
    diagnosis:{
        type: String
    },
    therapy:{
        type:String
    },
    dateAgain:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },firstnameLekar:{
        type:String
    },
    lastnameLekar:{
        type:String
    }
    


})

export default mongoose.model('ZakazanModel', Zakazan, 'zakazani')