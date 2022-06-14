import cors from 'cors';
import express from 'express';
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});