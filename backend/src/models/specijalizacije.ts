
import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Specijalizacija = new Schema({
    
    specialization: {
        type: String
    },
    
    
})

export default mongoose.model('SpecijalizacijaModel', Specijalizacija, 'specijalizacije')