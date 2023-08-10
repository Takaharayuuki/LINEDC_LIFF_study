import { WebhookEvent } from '@line/bot-sdk';
import express, { Request, Response, Router } from 'express';
import { pushMessage, replyMessage } from './clients/line';
import { validateSignatureSDK } from './validateSignature';
import { verifyTokenAPI } from './verifyToken';

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
interface MessageBody {
  message: string;
  id_token: string;
}
router.post('/message', async (req: Request, res: Response) => {
  // pushMessageを実施する
  const body: MessageBody = req.body as MessageBody;
  const userId = await verifyTokenAPI(body.id_token);
  await pushMessage(userId, body.message);
  res.status(200).send({ status: 'OK' });
});

// POST /webhook
router.post('/webhook', (req: Request, res: Response) => {
  // webhookイベントを受け取ってリプライする
  const signature = req.headers['x-line-signature'] as string;
  if (validateSignatureSDK(req.body, signature)) {
    console.log('signature validation ok');
  } else {
    console.log('signature validation ng');
  }

  const event = req.body as WebhookEvent;
  if (event.type === 'message' && event.message.type === 'text') {
    const sendMessage = `あなたは「${event.message.text}」だから参加してくれたんだね!ありがとう!`;
    replyMessage(event.replyToken, sendMessage);
  }
  res.status(200).send({ status: 'OK' });
});

app.use(router);
app.listen(3000, () => {
  console.log('listening on port 3000!');
});
