import express, { Request, Response, Router } from 'express';
import { pushMessage } from './pushMessage';

const app = express();

// CORSの許可
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = Router();

// POST /message
router.post('/message', async (req: Request, res: Response) => {
  // pushMessageを実施する
  await pushMessage('dummy', req.body.message);
  res.send(req.body);
});

// POST /webhook
router.post('/webhook', (req: Request, res: Response) => {
  // webhookイベントを受け取ってオウム返しする
  res.send(req.body);
});

app.use(router);
app.listen(3000, () => {
  console.log('listening on port 3000!');
});
