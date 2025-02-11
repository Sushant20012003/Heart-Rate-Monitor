import { HeartRate } from "../models/heartRate.model.js";
import { Patient } from "../models/patient.model.js";


// Add Heart Rate Record
export const addHeartRate = async (req, res) => {
    try {
        const { patientId, bpm } = req.body;
        const recordedBy = req.user._id;

        if(!patientId || !bpm) {
            return res.status(400).json({success:false, message: "Patient ID and BPM are required" });
        }

        const patientExists = await Patient.findById(patientId);
        if (!patientExists) return res.status(404).json({ success: false, message: "Patient not found" });

        const newHeartRate = await HeartRate.create({ patient: patientId, bpm, recordedBy });

        return res.status(201).json({ success: true, message: "Heart rate recorded successfully", data: newHeartRate });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding heart rate data", error });
    }
};

// Get Heart Rate Records for a Patient
export const getHeartRateByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const heartRates = await HeartRate.find({ patient: patientId }).populate('recordedBy', 'name role').sort({ recordedAt: -1 });
        if (heartRates.length === 0) {
            return res.status(404).json({ success: false, message: "No heart rate records found for this patient" });
        }

        return res.status(200).json({ success: true, data: heartRates });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error retrieving heart rate data", error });
    }
};

// Get Latest Heart Rate of a Patient
export const getLatestHeartRate = async (req, res) => {
    try {
        const { patientId } = req.params;

        const latestHeartRate = await HeartRate.findOne({ patient: patientId }).populate('recordedBy', 'name role').sort({ recordedAt: -1 });

        if (!latestHeartRate) {
            return res.status(404).json({ success: false, message: "No heart rate records found" });
        }

        return res.status(200).json({ success: true, data: latestHeartRate });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error retrieving latest heart rate", error });
    }
};
