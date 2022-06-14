import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send( {error: 'malformatted parameters'});
    return;
  }

  const answer = {
    height,
    weight,
    bmi: calculateBmi(height, weight)
  };
   return res.send(answer);
});

app.post('/exercises', (req, res) => {
  console.log('req',req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const exercises = req.body.daily_exercises as number[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number;

  if (!exercises || !target) {
    return res.send({ error: "parameters missing"}).status(400);
  }

  if (isNaN(Number(target)) || exercises.some(val => isNaN(val))) {
    return res.send({ error: "malformatted parameters"}).status(400);
  }
  
  const answer = calculateExercises(exercises, target);
  return res.send(answer);
 
  
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});