
To start the  project 

first  navigate  to both the frontend  and run 

npm install 

ng serve 


then  to run the  backend 

navigate to the backend and  run it 

first install packages 

npm install --force 

then you need  to fill up  the  .env file  with your informations

MONGO_URL="mongodb+srv://blockchain:blockchain@cluster.nszsxvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
USER: your email for  sending the email to yourself after the  competition close
PASS: your app password check toturial https://www.youtube.com/watch?v=QDIOBsMBEI0&t=620s

PRIVATE_KEY: your wallet private key
API_URL: your test  network 

now we need to deploy the  contracts  and add there hashes
use  these commands :
npx hardhat run --network ./scripts/studentManagementDeploy.js 
npx hardhat run --network ./scripts/acceptedDeploy.js 
npx hardhat run --network ./scripts/gouvernementDeploy.js 

the  output will be a hash put it in these  variables

student_contract_Address="student contract address"
governement_Contract_Address="governement contract address"
accepted_system_contract="system contract address"

and  finally  run  the backend 

npm start 


