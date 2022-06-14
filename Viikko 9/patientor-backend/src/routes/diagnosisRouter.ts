import express from 'express';
import { diagnoses } from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnoses;
  res.send(data);
});


export default router;