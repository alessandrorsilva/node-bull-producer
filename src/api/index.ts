import queues from '../queues';
import * as express from 'express';
import RedisCli from '../redis';

const redis = RedisCli.getInstance();
const router = express.Router();

const getPing = async (_req, res) => {
  const body = { message: 'hello' };
  return res.send(body).status(200);
};

const postLog = async (req, res) => {
  const body = { message: req.body.message };
  await queues.log.add(body);
  return res.send(body);
};

const postEmail = async (req, res) => {
  const body = { message: req.body.message };
  await queues.email.add(body);
  return res.send(body);
};

const postCandidate = async (req, res) => {
  const body: { 
    partyNumber: Number,
    name:  string,
    photo: string,
  } = req.body;
  await queues.candidate.add(body);
  return res.send(body).status(200);
};

const postVote = async (req, res) => {
  const body = req.body;
  await queues.vote.add({ partyNumber: body.partyNumber });
  return res.send(body);
};



router.get('/', getPing);
router.post('/log', postLog);
router.post('/email', postEmail);
router.post('/candidate', postCandidate);
router.post('/vote', postVote);


export default router;
