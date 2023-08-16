import express from 'express'
import { LekariController } from '../controllers/lekari.controller';


const lekariRouter = express.Router();



lekariRouter.route('/login').post(
    (req, res) => new LekariController().login(req, res)
)

lekariRouter.route('/register').post(
    (req, res) => new LekariController().register(req, res)
)

lekariRouter.route('/dohvatiSve').get(
    (req, res)=>new LekariController().dohvatiSve(req, res)
)

lekariRouter.route('/dohvatiJednog').post(
    (req, res)=>new LekariController().dohvatiJednog(req, res)
)

lekariRouter.route('/dohvatiJednogEmail').post(
    (req, res)=>new LekariController().dohvatiJednogEmail(req, res)
)


lekariRouter.route('/updatePassword').post(
    (req, res)=>new LekariController().updatePassword(req, res)
)

lekariRouter.route('/updateType').post(
    (req, res)=>new LekariController().updateType(req, res)
)

lekariRouter.route('/updateAll').post(
    (req, res)=>new LekariController().updateAll(req, res)
)

lekariRouter.route('/insertPregledi').post(
    (req, res)=>new LekariController().insertPregledi(req, res)
)






export default lekariRouter;