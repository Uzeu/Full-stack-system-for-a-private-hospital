import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/dohvatiSve').get(
    (req, res)=>new UserController().dohvatiSve(req, res)
)

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/dohvatiJednog').post(
    (req, res)=>new UserController().dohvatiJednog(req, res)
)
userRouter.route('/dohvatiJednogEmail').post(
    (req, res)=>new UserController().dohvatiJednogEmail(req, res)
)

userRouter.route('/dohvatiSveCekanje').get(
    (req, res)=>new UserController().dohvatiSveCekanje(req, res)
)

userRouter.route('/updateType').post(
    (req, res)=>new UserController().updateType(req, res)
)

userRouter.route('/updatePassword').post(
    (req, res)=>new UserController().updatePassword(req, res)
)

userRouter.route('/updateAll').post(
    (req, res)=>new UserController().updateAll(req, res)
)

userRouter.route('/addPregled').post(
    (req, res)=>new UserController().addPregled(req, res)
)




export default userRouter;