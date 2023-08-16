import express from 'express'
import PregledModel from '../models/pregledi'
import pregledi from '../models/pregledi';

export class PregledController {
    dohvatiJednog = (req: express.Request, res: express.Response) => {

        let name = req.body.name;
        PregledModel.findOne({ 'name': name }, (err, data) => {
            if (err) console.log(err);
            else res.json(data)
        })


    }


    dohvatiSve = (req: express.Request, res: express.Response) => {
        let specialization = req.body.specialization;
        let type = req.body.type;
        if (specialization == '') {
            pregledi.find({ 'type': type }, (err, users) => {
                if (err) console.log(err);
                else res.json(users)
            })
        } else {
            pregledi.find({ 'specialization': specialization, 'type': type }, (err, users) => {
                if (err) console.log(err);
                else res.json(users)
            })
        }
    }


    insertPregled = (req: express.Request, res: express.Response) => {
        let pregled = new PregledModel({
            name: req.body.name,
            specialization: req.body.specialization,
            price: req.body.price,
            duration: req.body.duration,
            type: req.body.type
        })
        pregled.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "ok" })
        })
    }

    updateType=(req:express.Request,res:express.Response)=>{
        let name=req.body.name;
        let type=req.body.type;
        PregledModel.updateOne({'name':name},{$set:{'type':type}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })


    }

    updatePriceDuration=(req:express.Request,res:express.Response)=>{
        let name=req.body.name;
        let price=req.body.price;
        let duration=req.body.duration;
        PregledModel.updateOne({'name':name},{$set:{'duration':duration,'price':price}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }

    
}