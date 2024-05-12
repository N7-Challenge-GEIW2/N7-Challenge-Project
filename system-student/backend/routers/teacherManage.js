const express = require('express');
const router = express.Router();
const ethers=require("ethers");
const jwt=require("jsonwebtoken")
const fs=require("fs")
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const student_contract_Address=process.env.student_contract_Address;
const accepted_system_contract=process.env.accepted_system_contract;
const governement_Contract_Address=process.env.governement_Contract_Address;


const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY,provider);

// Accepted_System_Contract
const {abi:acceptedSystemAbi}=require("../artifacts/contracts/AcceptedSystem.sol/AcceptedSystem.json");
console.log("system is this :"+accepted_system_contract,acceptedSystemAbi)
const acceptedSystemContractInstance = new ethers.Contract(accepted_system_contract, acceptedSystemAbi, signer);


// Student_Contract
const {abi}=require("../artifacts/contracts/StudentManagementSystem.sol/StudentManagementSystem.json");
const contractInstance = new ethers.Contract(student_contract_Address, abi, signer);


// governement_Contract
const {abi:gouvernementAbi}=require("../artifacts/contracts/GouvernementSystem.sol/GouvernementSystem.json");
const gouvernementContractInstance = new ethers.Contract(governement_Contract_Address, gouvernementAbi, signer);





router.post('/block-register',async (req, res) => {  
    try{
  
        // Access the request body
      const {
        cni,
        schoolName,
        degreeType,
        major,
        s1,
        s2,
        s3,s4,s5,s6
      } = req.body;  
      const scores=[s1,s2,s3,s4,s5,s6];

        // Create a new student  from governament data
        const student=await gouvernementContractInstance.getStudent(cni);
        if(student.length==0||student[0]==""||student[1]==""||student[2]==""||student[3]==""){
            return res.status(400).json({ message: 'Student not found' });
        }

        let tx=await contractInstance.registerStudent(student[0],student[1],student[2],student[3]);
        await tx.wait();


        // add the degree to the student
         tx=await contractInstance.addDegree(cne,schoolName,degreeType,major,scores);
        await tx.wait();
        return     res.status(201).json({ message: 'Student registered successfully', student:{cni,cne,name,email} });
    }catch(err){
        console.log(err);
        return     res.status(400).json({ message: 'Invalid ', student });
    } 
    // Here, you can save the student object to a database or perform any other necessary operations
    // Send a response
  });
  

  
// router.post('/add-degree',async (req, res) => {
    
//     try{
//     const {
//         cne,
//         schoolName,
//         degreeType,
//         major,
//         s1,
//         s2,
//         s3,s4,s5,s6
//       } = req.body;
//         const scores=[s1,s2,s3,s4,s5,s6];
//         console.log(scores)
//         const tx=await contractInstance.addDegree(cne,schoolName,degreeType,major,scores);
//         await tx.wait();
//         return     res.status(201).json({ message: 'Student degree added successfully' });
//     }catch(err){
//         console.log(err);
//         return     res.status(400).json({ message: 'Invalid ' });
//     } 
//     // Here, you can save the student object to a database or perform any other necessary operations
//     // Send a response
//   });


router.get('/student',async (req, res) => {
    try{      
          const token=req.cookies.jwt
        const claims=jwt.verify(token,process.env.TOKEN||"secret")
        if(!claims){
            return res.status(401).send({message:"invalid token"})
        }
        cni=claims.cni;
        const student=await contractInstance.getStudent(cni);
        
        return     res.status(201).json(convertStudentDataToObject(student));
    }catch(err){
        console.log(err);
        return     res.status(400).json({ message: 'Invalid ' });
    } 
    // Here, you can save the student object to a database or perform any other necessary operations
    // Send a response
  });

router.post('/verify-student/',async (req, res) => {
    if(req.closeCompition){
      return res.status(400).json({message:"Competition is closed"})
    }

    try{      
        const {cni,major}=req.body;
        if(!cni){
          return res.status(400).json({message:"Invalid cni"})
        }
        const student=await contractInstance.getStudent(cni);
        let studentObject= convertStudentDataToObject(student)
        if(studentObject.cne==""){
            return res.status(400).json({message:"Student not found"})
        }
        if (studentObject.degreeType=="Lience",calculateStudentAverage(studentObject)<10){
            return res.status(400).json({message:"Student not allowed to register"})
        }
        // else  allow him to register 
        const {name,email,cne}=studentObject;
         const tx=await acceptedSystemContractInstance.registerUser(cni,cne,email,name,major,{gasLimit: 8000000});
        await tx.wait();
        // register in a csv file 
        const csvData = `${name},${email},${cne},${cni},${major}\n`;
        fs.appendFileSync('files/data.csv', csvData);
        return     res.status(201).json({ message: 'Student registered successfully', student:{cni,cne,name,email} });

    }catch(err){
        console.log(err);
        return     res.status(400).json({ message: 'Invalid ' });
    } 
    // Here, you can save the student object to a database or perform any other necessary operations
    // Send a response
  });






function hexToDecimal(hex) {
    return parseInt(hex, 16);
}
function convertStudentDataToObject(studentData) {
    console.log(studentData);
    const student= studentData.flat(Infinity)

    let studentObject={
      cne:student[0],
      cni:student[1],
      name:student[2],
      email:student[3],
      schoolName:student[4],
      degreeType:student[5],
      major:student[6],
      
    }
    for (let i = 7; i < student.length; i++) {
      studentObject["semester" + (i-6 )] = student[i].toNumber();
    }
    return studentObject
  } 

function calculateStudentAverage({semester1,semester2,semester3,semester4}){
    return (semester1+semester2+semester3+semester4)/4;
}
module.exports = router;