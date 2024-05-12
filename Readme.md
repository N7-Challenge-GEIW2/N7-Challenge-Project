# Project Overview

This project aims to streamline the student application process at ENSET using innovative technologies like blockchain, artificial intelligence (AI), and cybersecurity. Our solution comprises two interconnected systems: one for teachers to securely record student information and another for students to apply to higher schools.

## Getting Started

### Frontend Setup
1. Navigate to the frontend directory.
2. Run `npm install` to install dependencies.
3. Execute `ng serve` to start the frontend server.

### Backend Setup
1. Navigate to the backend directory.
2. Install required packages by running `npm install --force`.
3. Fill up the `.env` file with your information:

```dotenv
MONGO_URL="mongodb+srv://blockchain:blockchain@cluster.nszsxvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
USER: [Your Email for Notifications]
PASS: [Your App Password] 
PRIVATE_KEY: [Your Wallet Private Key] 
API_URL: [Your Test Network URL]
```

### Contract Deployment
1. Deploy the contracts and add their hashes by executing these commands:
```bash
npx hardhat run --network ./scripts/studentManagementDeploy.js 
npx hardhat run --network ./scripts/acceptedDeploy.js 
npx hardhat run --network ./scripts/gouvernementDeploy.js 
```
2. The output will be a hash; put it in these variables:

```dotenv
student_contract_Address="[Student Contract Address]"
governement_Contract_Address="[Government Contract Address]"
accepted_system_contract="[System Contract Address]"
```

### Running the Backend
1. Run the backend server by executing `npm start`.

---

## BY : Digital Phantoms Team - N7 Challenge Hackathon
