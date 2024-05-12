const hre=require("hardhat");
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const contractAddress=process.env.Contract_Address;


async function main(){
const hhprovider = new ethers.providers.JsonRpcProvider(API_URL);
const signer =  new ethers.Wallet(PRIVATE_KEY,hhprovider)
const GouvernementSystem=await hre.ethers.getContractFactory("GouvernementSystem",signer);
const gouvernementSystem=await GouvernementSystem.deploy();
await gouvernementSystem.deployed();

console.log("StudentManagementSystem deployed to:",gouvernementSystem.address);


}

main().catch((error)=>{
    console.log(error);
    process.exitCode=1;
})