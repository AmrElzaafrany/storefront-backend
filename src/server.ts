import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';

const app = express()
const address: string = "0.0.0.0:3000"

const corsOption = {
  optionsSuccessStatus: 200 // for some lagacy browsers
};

app.use(bodyParser.json())
app.use(cors(corsOption));
app.use(express.json());
// set routes
routes(app);


app.get('/', function (req: Request, res: Response) {
    res.send('Hello')
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
