import { HeartRate } from "../models/heartRate.model.js";
import { Patient } from "../models/patient.model.js";


// Add Patient
export const addPatient = async (req, res) => {
    try {

        const { name, age, gender, contact } = req.body;
        const createdBy = req.user._id;

        if (!name || !age || !gender || !contact.phone) {
            return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }

        const newPatient = await Patient.create({...req.body, createdBy});
        return res.status(201).json({ success: true, message: "Patient added successfully", patient: newPatient });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error adding patient", error });
    }
};

// Get All Patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("assignedDoctor", "name email role");
        return res.status(200).json({ success: true, patients });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching patients", error });
    }
};


//Get single patient 
export const getPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patient = await Patient.findById(patientId).populate("assignedDoctor", "name email").populate('createdBy', 'name email role');
        return res.status(200).json({ success: true, patient });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching patients", error });
    }
};



//delete patient
export const deletePatient = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({success:false, message: "Patient not found" });
      }
  
      // Delete associated heart rate records
      await HeartRate.deleteMany({ patient: patientId });
  
      // Delete the patient
      await Patient.findByIdAndDelete(patientId);
  
      return res.status(200).json({success:true, message: "Patient and associated heart rate data deleted successfully" });
    } catch (error) {
      res.status(500).json({success:false, message: "Error deleting patient", error });
    }
  };