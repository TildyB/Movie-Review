import dotenv from 'dotenv';
dotenv.config();
import express, { Express} from 'express';
import login from './routes/login'
import reviews from './routes/reviews'
import cors from 'cors'

const app: Express = express();

app.use(cors())
app.use(express.json());
app.use('/api/login', login)
app.use('/api/reviews', reviews)





export default app