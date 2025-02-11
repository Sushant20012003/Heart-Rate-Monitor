import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addHeartRate, getHeartRateByPatient, getLatestHeartRate } from '../controllers/heartRate.controller.js';

const router = express.Router();

router.route('/add').post(isAuthenticated, addHeartRate);
router.route('/get/all/:patientId').get(isAuthenticated, getHeartRateByPatient);
router.route('/get/latest/:patientId').get(isAuthenticated, getLatestHeartRate);

export default router;