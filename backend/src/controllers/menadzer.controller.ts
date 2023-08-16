import express from 'express'
import MenadzerModel from '../models/menadzer'
import menadzer from '../models/menadzer';

export class MenadzerController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        MenadzerModel.findOne({'username': username, 'password': password}, (err, menadzer)=>{
            
            console.log(menadzer);
            if(err) console.log(err);
            else res.json(menadzer)
        })

        
    }

    


}