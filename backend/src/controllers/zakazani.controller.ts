import express from 'express'
import ZakazanModel from '../models/zakazani'

export class ZakazanController {

    insertZakazan = (req: express.Request, res: express.Response) => {
        let zakazan = new ZakazanModel({
            user: req.body.user,
            lekar: req.body.lekar,
            specialization: req.body.specialization,
            pregled: req.body.pregled,
            office: req.body.office,
            type: req.body.type,
            year: req.body.year,
            month: req.body.month,
            day: req.body.day,
            hour: req.body.hour,
            minute: req.body.minute,
            duration: req.body.duration,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            firstnameLekar:req.body.firstnameLekar,
            lastnameLekar:req.body.lastnameLekar
        })

        zakazan.save((err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "message": "error" })
            }
            else res.json({ "message": "ok" })
        })
    }

    updateZakazani=(req:express.Request,res:express.Response)=>{
        let user=req.body.user;
        let lekar=req.body.lekar;
        let year=req.body.year;
        let month=req.body.month;
        let day=req.body.day;
        let hour=req.body.hour;
        let minute=req.body.minute;

        let reason=req.body.reason;
        let diagnosis=req.body.diagnosis;
        let therapy=req.body.therapy;
        let dateAgain=req.body.dateAgain;

        ZakazanModel.updateOne({'user':user,'lekar':lekar,'type':0,'year':year,'month':month,'day':day,'hour':hour,'minute':minute},{$set: {'type': 1,'reason':reason,'diagnosis':diagnosis,'therapy':therapy,'dateAgain':dateAgain}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }

    dohvatiZakazan = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar;
        let user = req.body.user;
        let type = req.body.type;

        if (lekar == '') {
            if (type == -1) {
                ZakazanModel.find({ 'user': user }, (err, zakazani) => {
                    if (err) console.log(err);
                    else res.json(zakazani)
                })
            }
            else {
                ZakazanModel.find({ 'type': type, 'user': user }, (err, zakazani) => {
                    if (err) console.log(err);
                    else res.json(zakazani)
                })
            }
        }
        else if (user == '') {
            if (type == -1) {
                ZakazanModel.find({ 'lekar': lekar }, (err, zakazani) => {
                    if (err) console.log(err);
                    else res.json(zakazani)
                })
            } else {
                ZakazanModel.find({ 'type': type, 'lekar': lekar }, (err, zakazani) => {
                    if (err) console.log(err);
                    else res.json(zakazani)
                })
            }
        }
        else {
            console.log("sto mi to radis");
        }
    }

    deleteZakazani=(req:express.Request,res:express.Response)=>{
        let user=req.body.user;
        let lekar=req.body.lekar;
        let year=req.body.year;
        let month=req.body.month;
        let day=req.body.day;
        let hour=req.body.hour;
        let minute=req.body.minute;

        let reason=req.body.reason;
        let diagnosis=req.body.diagnosis;
        let therapy=req.body.therapy;
        let dateAgain=req.body.dateAgain;

        ZakazanModel.deleteOne({'user':user,'lekar':lekar,'type':0,'year':year,'month':month,'day':day,'hour':hour,'minute':minute},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'deleted'})
        })
    }



}