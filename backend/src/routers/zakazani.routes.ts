import express, { Router } from 'express'
import { ZakazanController } from '../controllers/zakazani.controller'


const zakazanRouter=express.Router();

zakazanRouter.route('/insertZakazan').post(
    (req, res)=>new ZakazanController().insertZakazan(req,res)
)

zakazanRouter.route('/dohvatiZakazan').post(
    (req,res)=>new ZakazanController().dohvatiZakazan(req,res)
)

zakazanRouter.route('/updateZakazani').post(
    (req,res)=>new ZakazanController().updateZakazani(req,res)
)

zakazanRouter.route('/deleteZakazani').post(
    (req,res)=>new ZakazanController().deleteZakazani(req,res)
)



export default zakazanRouter;