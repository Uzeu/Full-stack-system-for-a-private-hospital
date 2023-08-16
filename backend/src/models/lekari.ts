
import mongoose from "mongoose";
import pregledi from "./pregledi";


const Schema = mongoose.Schema;

const Pregled = new Schema({
    
    name: {
        type: String
    },
    specialization:{
        type: String
    },
    price:{
        type: Number
    },
    duration:{
        type: Number
    },
    type:{
        type:Number
    }
    
    
})


let Lekar = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    },
    phone:{
        type: Number
    },
    adress:{
        type: String
    },
    photo:{
        type: String
    },
    licence:{
        type: Number
    },
    specialization:{
        type: String
    },
    office:{
        type: String
    },
    email:{
        type:String
    },
    pregledi:{
        type: [Pregled]
    }
})

export default mongoose.model('LekariModel', Lekar, 'lekari')