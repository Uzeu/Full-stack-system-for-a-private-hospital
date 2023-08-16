import express from 'express'
import UserModel from '../models/user'
import LekariModel from '../models/lekari'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        UserModel.findOne({'username': username, 'password': password,'type':1}, (err, user)=>{
            
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            adress: req.body.adress,
            phone:req.body.phone,
            photo:req.body.photo,
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
        UserModel.find({'type':1},(err,users)=>{
            
            if(err) console.log(err);
            else res.json(users)
        })
    }

    dohvatiSveCekanje=(req: express.Request, res: express.Response)=>{
        let broj=0;
        UserModel.find({'type':broj},(err,users)=>{
            
            if(err) console.log(err);
            else res.json(users)
        })
    }

    dohvatiJednog=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        UserModel.findOne({'username':username},(err,user)=>{
            
            if(err) console.log(err);
            else res.json(user)
        })
    }
    dohvatiJednogEmail=(req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        
        UserModel.findOne({'email':email},(err,user)=>{
            
            if(err) console.log(err);
            else res.json(user)
        })
    }

    updateType=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let type=req.body.type;
        UserModel.updateOne({'username':username},{$set: {'type': type}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }


    updatePassword=(req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password=req.body.password;
        UserModel.updateOne({'username':username},{$set: {'password': password}},(err,resp)=>{
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

        UserModel.updateOne({'username':username},{$set: {'firstname': firstname,'lastname':lastname,'phone':phone,'email':email,'adress':adress,'photo':photo}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'updated'})
        })
    }

    addPregled=(req:express.Request,res:express.Response)=>{
        let username = req.body.username;
        let pregledi=req.body.pregledi;
        UserModel.updateOne({'username':username},{$set:{'pregledi':pregledi}},(err,resp)=>{
            if(err)console.log(err);
            else res.json({'message':'updated'})
        })
    }
    
    
}