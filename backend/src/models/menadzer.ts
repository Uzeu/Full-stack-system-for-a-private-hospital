
import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Menadzer = new Schema({
    
    username: {
        type: String
    },
    password: {
        type: String
    }
    
})

export default mongoose.model('MenadzerModel', Menadzer, 'menadzer')