
import mongoose from "mongoose";
import pregledi from "./pregledi";


const Schema = mongoose.Schema;

let User = new Schema({
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
    email:{
        type:String
    }

})

export default mongoose.model('UserModel', User, 'users')