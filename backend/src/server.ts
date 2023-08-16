import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import menadzerRouter from './routers/mendazer.routes';
import lekariRouter from './routers/lekari.routes';
import specializationRouter from './routers/specijalizacije.routes'
import preglediRouter from './routers/pregledi.routes'
import zakazanRouter from './routers/zakazani.routes';


const app = express();
app.use(cors())
app.use(express.json())




mongoose.connect('mongodb://127.0.0.1:27017/piamean')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/menadzer',menadzerRouter);
router.use('/lekari',lekariRouter)
router.use('/specijalizacije',specializationRouter)
router.use('/pregledi',preglediRouter)
router.use('/zakazani',zakazanRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));