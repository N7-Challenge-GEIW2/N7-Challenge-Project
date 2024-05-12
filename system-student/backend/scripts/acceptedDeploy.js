const hre=require("hardhat");
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const accepted_system_contract=process.env.accepted_system_contract;


async function main(){
const hhprovider = new ethers.providers.JsonRpcProvider(API_URL);
const signer =  new ethers.Wallet(PRIVATE_KEY,hhprovider)
const AcceptedSystem=await hre.ethers.getContractFactory("AcceptedSystem",signer);
const acceptedSystem=await AcceptedSystem.deploy();
await acceptedSystem.deployed();

console.log("StudentManagementSystem deployed to:",acceptedSystem.address);


}

main().catch((error)=>{
    console.log(error);
    process.exitCode=1;
})