import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addPatient, deletePatient, getAllPatients, getPatient } from '../controllers/patient.controller.js';

const router = express.Router();

router.route('/add').post(isAuthenticated, addPatient);
router.route('/all').get(isAuthenticated, getAllPatients);
router.route('/get/:patientId').get(isAuthenticated, getPatient);
router.route('/delete/:patientId').delete(isAuthenticated, deletePatient);

export default router;