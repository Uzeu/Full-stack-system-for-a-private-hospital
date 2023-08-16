
import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Pregled = new Schema({
    
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

export default mongoose.model('PregledModel', Pregled, 'pregledi')