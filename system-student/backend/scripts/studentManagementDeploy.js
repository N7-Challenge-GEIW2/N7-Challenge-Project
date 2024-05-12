const hre=require("hardhat");
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;


async function main(){
const hhprovider = new ethers.providers.JsonRpcProvider(API_URL);
const signer =  new ethers.Wallet(PRIVATE_KEY,hhprovider)
const StudentManagementSystem=await hre.ethers.getContractFactory("StudentManagementSystem",signer);
const studentManagementSystem=await StudentManagementSystem.deploy();
await studentManagementSystem.deployed();

console.log("StudentManagementSystem deployed to:",studentManagementSystem.address);


}

main().catch((error)=>{
    console.log(error);
    process.exitCode=1;
})