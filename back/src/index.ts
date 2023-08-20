import { WebhookEvent } from '@line/bot-sdk';
import express, { Request, Response, Router } from 'express';
import { pushMessage, replyMessage } from './clients/line';
import { validateSignatureSDK } from './utils/validateSignature';
import { verifyTokenAPI } from './utils/verifyToken';

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
  // アンケートの回答結果を元にpushMessageを実施する
  if (!req.body.message || !req.body.id_token) {
    console.error('message or id_token is empty');
    return res.status(400).send({ status: 'NG' });
  }
  const body: MessageBody = req.body as MessageBody;
  const userId = await verifyTokenAPI(body.id_token);
  if (!userId) {
    console.error('verifyTokenAPI failed');
    return res.status(400).send({ status: 'NG' });
  }
  const sendMessage = `あなたは「${body.message}」だから参加してくれたんだね!ありがとう!`;
  await pushMessage(userId, sendMessage);
  res.status(200).send({ status: 'OK' });
});

// POST /webhook
router.post('/webhook', async (req: Request, res: Response) => {
  // webhookイベントを受け取ってリプライする
  const signature = req.headers['x-line-signature'] as string;

  if (validateSignatureSDK(JSON.stringify(req.body), signature)) {
    console.log('signature validation ok');
  } else {
    console.log('signature validation ng');
    res.status(403).send({ status: 'NG' });
    return;
  }

  const events = req.body.events as WebhookEvent[];
  events.forEach(async (event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const sendMessage = `あなたは「${event.message.text}」だから参加してくれたんだね!ありがとう!`;
      await replyMessage(event.replyToken, sendMessage);
    }
  });
  res.status(200).send({ status: 'OK' });
});

app.use(router);
app.listen(3000, () => {
  console.log('listening on port 3000!');
});
