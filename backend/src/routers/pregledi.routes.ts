import express from 'express'
import { PregledController } from '../controllers/pregledi.controller';


const preglediRouter=express.Router();

preglediRouter.route('/dohvatiJednog').post(
    (req,res)=>new PregledController().dohvatiJednog(req,res)
)

preglediRouter.route('/insertPregled').post(
    (req,res)=> new PregledController().insertPregled(req,res)
)

preglediRouter.route('/dohvatiSve').post(
    (req, res)=>new PregledController().dohvatiSve(req, res)
)

preglediRouter.route('/updateType').post(
    (req, res)=>new PregledController().updateType(req, res)
)

preglediRouter.route('/updatePriceDuration').post(
    (req,res)=> new PregledController().updatePriceDuration(req,res)
)


export default preglediRouter