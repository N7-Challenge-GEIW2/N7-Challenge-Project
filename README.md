# N7 Challenge Project : AI, CyberSecurity and Blockchain to make an application for the management of students in Morocco

### To start the  project 

1. **first  navigate  to both the frontend  and run**

```bash
npm install 

ng serve
```

2. **then  to run the  backend** 

navigate to the backend and  run it but first install packages with :

```bash
npm install --force
``` 

3. **then you need  to fill up the .env file  with your information**

```bash
MONGO_URL="mongodb+srv://blockchain:blockchain@cluster.nszsxvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
USER: your email for  sending the email to yourself after the  competition close
PASS: your app password check tutorial https://www.youtube.com/watch?v=QDIOBsMBEI0&t=620s
```

**N.B** : PRIVATE_KEY: your wallet private key

**N.B** : API_URL: your test network

4. **now we need to deploy the  contracts  and add there hashes**

use  these commands :
    
```bash
npx hardhat run --network volta ./scripts/studentManagementDeploy.js
npx hardhat run --network volta  ./scripts/acceptedDeploy.js
npx hardhat run --network volta ./scripts/gouvernementDeploy.js
```

the output will be a hash put it in these variables :

```bash
student_contract_Address="student contract address"
governement_Contract_Address="governement contract address"
accepted_system_contract="system contract address"
```

5. **finally run the backend**

```bash
npm start
```