Overview

This project is a backend system for managing users, patients, and heart rate data. It is built using Node.js, Express, and MongoDB and provides RESTful APIs for handling authentication, patient management, and heart rate data.


Features

-> User Authentication (Register, Login, Logout)

-> Patient Management (Add, Retrieve, Delete Patients)

-> Heart Rate Monitoring (Add and Retrieve Heart Rate Data)

-> Middleware for Authentication

-> Secure API with JSON Web Tokens (JWT)



=> I explain how to setup , run and use the project in the following sections. but for your convenience , I have 
also hosted the project on render.com, so you can test it directly using Postman or any other plateform,  without setting up anything on your local machine.

Link: https://heart-rate-monitor.onrender.com


📌 Project Setup

1️⃣ Clone the Repository

git clone https://github.com/Sushant20012003/Heart-Rate-Monitor.git

go to the project directory

2️⃣ Install Dependencies

npm install
or, npm run build

3️⃣ Configure Environment Variables
Create a .env file in the root directory and add the following:

PORT=5000
MONGODB_URI=<Your MongoDB Connection String>
JWT_SECRET_KEY=<Your Secret Key>
NODE_ENV=development               (use 'production' in production)

4️⃣ Run the Project
nodemon 
or, npm run start





🔥 API Documentation

1️⃣ User Authentication APIs

✅ Register User

-> Endpoint: POST /api/users/register
-> Request Body:
{
    "name":"Jhon",
    "email":"jhon@gmail.com",
    "password":"abc@123",
    "role":"doctor"          (optional)(options: doctor, nurse, staff(default))
}


✅ Login User
->Endpoint: POST /api/users/login
Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

✅ Logout User
->Endpoint: GET /api/users/logout



2️⃣ Patient Management APIs

✅ Add Patient
->Endpoint: POST /api/patients/add
Request Body:
{
  "name": "Alice",
  "age": 30,
  "gender": "female",
  "contact": { "phone": "1234567890", "email": "alice@example.com" },
  "medicalHistory": [ { "condition": "Diabetes", "status": "ongoing" } ],
  "assignedDoctor":"abc1236277"                    (this is _id of doctor)
}


✅ Get All Patients
->Endpoint: GET /api/patients/all

✅ Get Patient by ID
->Endpoint: GET /api/patients/get/:patientId

✅ Delete Patient
->Endpoint: DELETE /api/patients/delete/:patientId



3️⃣ Heart Rate Monitoring APIs

✅ Add Heart Rate Data
->Endpoint: POST /api/heart-rate/add
Request Body:
{
    "patientId":"67aba2481d9cbff551e98942",
    "bpm":256
}

✅ Get All Heart Rate Data for a Patient
->Endpoint: GET /api/heartrate/get/all/:patientId


✅ Get Latest Heart Rate Data
->Endpoint: GET /api/heartrate/get/latest/:patientId





🚀 Technologies Used

Node.js & Express.js (Backend Framework)

MongoDB & Mongoose (Database & ODM)

JSON Web Token (JWT) (Authentication)

bcrypt.js (Password Hashing)

dotenv (Environment Configuration)



🛠️ Author

Sushant Kumar
