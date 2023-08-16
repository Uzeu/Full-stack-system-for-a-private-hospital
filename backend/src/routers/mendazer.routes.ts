import express from 'express'
import { MenadzerController } from '../controllers/menadzer.controller';


const menadzerRouter = express.Router();



menadzerRouter.route('/login').post(
    (req, res) => new MenadzerController().login(req, res)
)







export default menadzerRouter;