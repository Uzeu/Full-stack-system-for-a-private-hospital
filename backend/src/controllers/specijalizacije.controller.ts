import express from 'express'
import  specijalizacije from '../models/specijalizacije';
import SpecijalizacijaModel from '../models/specijalizacije'

export class SpecijalizacijaController{




    dohvatiJednog = (req: express.Request, res: express.Response)=>{

        let specialization = req.body.specialization;  
        SpecijalizacijaModel.findOne({'specialization': specialization}, (err, data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }

    insertSpecialization= (req : express.Request, res:express.Response)=>{
        let specialization=new SpecijalizacijaModel({
            specialization:req.body.specialization
        })
        specialization.save((err,resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }


    dohvatiSve=(req: express.Request, res: express.Response)=>{
        specijalizacije.find({},(err,users)=>{
            if(err) console.log(err);
            else res.json(users)
        })
    }


}