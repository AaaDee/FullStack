import express from 'express';
import patientService from '../services/patientService';
import { Entry, NewPatient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findOne(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
    res.send(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry: Entry = toNewEntry(req.body);
    const entry = patientService.addEntry(id, newEntry);
    res.send(entry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;