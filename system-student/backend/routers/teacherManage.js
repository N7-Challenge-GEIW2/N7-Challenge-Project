const express = require('express');
const router = express.Router();
const ethers=require("ethers");
const jwt=require("jsonwebtoken")
const fs=require("fs")
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const student_system_contract=process.env.student_system_contract;
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
const contractInstance = new ethers.Contract(student_system_contract, abi, signer);


// governement_Contract
const {abi:gouvernementAbi}=require("../artifacts/contracts/GouvernementSystem.sol/GouvernementSystem.json");
const gouvernementContractInstance = new ethers.Contract(governement_Contract_Address, gouvernementAbi, signer);





router.post('/students',async (req, res) => {
    try{
  
        // Access the request body
      const {
        cne,
        schoolName,
        degreeType,
        major,
        s1,
        s2,
        s3,s4,s5,s6
      } = req.body;  
      const scores=standardScore([s1,s2,s3,s4,s5,s6]);

        // Create a new student  from governament data
        const student=await gouvernementContractInstance.getUser(cne);
        console.log(student);
        if(student.length==0||student[0]==""||student[1]==""||student[2]==""||student[3]==""){
            return res.status(400).json({ message: 'Student not found' });
        }
       // const studentCl=await contractInstance.getStudent(student[0]);
       //  if(studentCl[0]!=""||studentCl[1]!=""){
       //      return res.status(400).json({ message: 'Student already registered found' });
       //  }
        let tx=await contractInstance.registerStudent(student[0],student[1],student[2],student[3]);
        await tx.wait();

        // add the degree to the student
         tx=await contractInstance.addDegree(cne,schoolName,degreeType,major,scores);
        await tx.wait();
        const studentClz=await contractInstance.getStudent(student[0]);
        console.log("==============================")
        console.log(studentClz);
        console.log("==============================")

        return     res.status(201).json({ message: 'Student registered successfully'});
    }catch(err){
        console.log(err);
        return     res.status(400).json({ message: 'Invalid ' });
    } 
    // Here, you can save the student object to a database or perform any other necessary operations
    // Send a response
  });
  



router.get('/students',async (req, res) => {
    try{      
          const token=req.cookies.jwt
        const claims=jwt.verify(token,process.env.TOKEN||"secret")
        if(!claims){
            return res.status(401).send({message:"invalid token"})
        }
        cni=claims.cni;
        const student=await contractInstance.getStudent(cni);
        
        return     res.status(201).json([convertStudentDataToObject(student)]);
    }catch(err){
        console.log(err);
        return     res.status(400).json({ message: 'Invalid ' });
    } 
    // Here, you can save the student object to a database or perform any other necessary operations
    // Send a response
  });

router.post('/verify-student/',async (req, res) => {
    if(req.closeCompition){
      return res.status(400).json({message:"Competition is closed, Come back next year"})
    }

    try{      
        const {cni,major}=req.body;
        if(!cni){
          return res.status(400).json({message:"Invalid cni"})
        }
        const student=await contractInstance.getStudent(cni);

        let studentObject= convertStudentDataToObject(student)
        console.log("==============================")
        console.log(studentObject);
        console.log("==============================")
        if(studentObject.cne==""){
            return res.status(400).json({message:"Student not found"})
        }
        if (studentObject.degreeType==="DEUG" && calculateStudentAverage(studentObject)<12){
            return res.status(400).json({message:"Student not allowed to register"})
        }
        if (studentObject.degreeType==="LICENCE"){
            return res.status(400).json({message:"Student not allowed to register"})
        }
        if (studentObject.degreeType==="DEUST" && calculateStudentAverage(studentObject)<15){
            return res.status(400).json({message:"Student not allowed to register"})
        }
        if (studentObject.degreeType==="DUT" && calculateStudentAverage(studentObject)<16){
            return res.status(400).json({message:"Student not allowed to register"})
        }
        // else  allow him to register


        const {name,email,cne}=studentObject;
        console.log("studentObject")
        console.log(cni,cne,email,name,major)
         const tx=await acceptedSystemContractInstance.registerUser(cni,cne,email,name,major);

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


function convertStudentDataToObject(studentData) {

    const student= studentData.flat(Infinity)

    let studentObject={
        cni:student[0],
        cne:student[1],
      email:student[2],
      name:student[3],
        degreeType :student[4],
        schoolName:student[5],
      major:student[6],
      
    }

    for (let i = 7; i < student.length; i++) {
      studentObject["semester" + (i-6 )] =parseInt(student[i]._hex, 16)/100;
    }
    return studentObject
  } 

function calculateStudentAverage({semester1,semester2,semester3,semester4}){
    return (semester1+semester2+semester3+semester4)/4;
}

function standardScore(arr){
    return arr.map((x)=>x*100)
}

module.exports = router;