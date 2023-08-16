import express from 'express'
import MenadzerModel from '../models/menadzer'
import menadzer from '../models/menadzer';
import LekariModel from '../models/lekari'

export class LekariController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        LekariModel.findOne({'username': username, 'password': password,'type':1}, (err, lekar)=>{
            
            if(err) console.log(err);
            else res.json(lekar)
        })


        
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new LekariModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            adress: req.body.adress,
            phone:req.body.phone,
            photo:req.body.photo,
            licence:req.body.licence,
            specialization:req.body.specialization,
            office:req.body.office,
            email:req.body.email
        })
        
       

        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    dohvatiSve=(req: express.Request, res: express.Response)=>{
        
        LekariModel.find({'type':1},(err,lekari)=>{
            if(err) console.log(err);
            else res.json(lekari)
        })
    }

    dohvatiJednog=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        LekariModel.findOne({'username':username},(err,lekar)=>{
            
            if(err) console.log(err);
            else res.json(lekar)
        })
    }

    dohvatiJednogEmail=(req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        
        LekariModel.findOne({'email':email},(err,lekar)=>{
            
            if(err) console.log(err);
            else res.json(lekar)
        })
    }



    updatePassword=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password=req.body.password;
        LekariModel.updateOne({'username':username},{$set: {'password': password}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }

    updateType=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let type=req.body.type;
        LekariModel.updateOne({'username':username},{$set: {'type': type}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }


    updateAll=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let phone=req.body.phone;
        let email=req.body.email;
        let adress=req.body.adress;
        let photo=req.body.photo;
        let specialization=req.body.specialization;
        let office=req.body.office;
        let licence=req.body.licence;

        LekariModel.updateOne({'username':username},{$set: {'firstname': firstname,'lastname':lastname,'phone':phone,'email':email,'adress':adress,'photo':photo,'specialization':specialization,'licence':licence,'office':office}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }

    insertPregledi=(req:express.Request,res:express.Response)=>{
        let username=req.body.username;
        let pregledi=req.body.pregledi;
        LekariModel.updateOne({'username':username},{$set:{'pregledi':pregledi}},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'updated'})
        })

    }

}