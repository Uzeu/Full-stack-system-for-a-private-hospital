import express from 'express'
import { SpecijalizacijaController } from '../controllers/specijalizacije.controller';

const specializationRouter = express.Router();



specializationRouter.route('/dohvatiJednog').post(
    (req,res)=> new SpecijalizacijaController().dohvatiJednog(req,res)
)

specializationRouter.route('/insertSpecialization').post(
    (req,res)=> new SpecijalizacijaController().insertSpecialization(req,res)
)

specializationRouter.route('/dohvatiSve').get(
    (req, res)=>new SpecijalizacijaController().dohvatiSve(req, res)
)

export default specializationRouter