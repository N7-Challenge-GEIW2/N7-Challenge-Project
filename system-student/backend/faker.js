const { faker } = require('@faker-js/faker');
const ethers=require("ethers");
require('dotenv').config();
const API_URL= process.env.API_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const governement_Contract_Address=process.env.governement_Contract_Address;



const provider = new ethers.providers.JsonRpcProvider(API_URL);
console.log(PRIVATE_KEY,provider)
const signer = new ethers.Wallet(PRIVATE_KEY,provider);
const {abi}=require("./artifacts/contracts/GouvernementSystem.sol/GouvernementSystem.json");
const contractInstance = new ethers.Contract(governement_Contract_Address, abi, signer);


// Function to generate fake user data
// anas,younes nohayla
function generateFakeUser() {
  const cni = faker.number.int(5);
  const cne = faker.number.int(5);
  const name = faker.person.fullName();
  const email = faker.internet.email();

  return { cni, cne, name, email };
}

// Function to register a user on the contract
async function registerUser(cni, cne, name, email) {
  let tx=await contractInstance.registerUser(cni, cne, email, name);
  await tx.wait();
  console.log(`User registered: ${name} (${cni})`);
}

// Generate and register a specified number of fake users
async function populateUsers(numUsers) {
  for (let i = 0; i < numUsers; i++) {
    const fakeUser = generateFakeUser();
    await registerUser(fakeUser.cni, fakeUser.cne, fakeUser.name, fakeUser.email);
  }
  // register younes,anas,nohayla change this later
  const users = [{
    cni: "anas",
    cne: "12345678",
    name: "anas",
    email: "anas@gmail.com"
  },
  {
    cni: "younes",
    cne: "87654321",
    name: "younes",
    email: "younes@gmail.com"
  },
  {
    cni: "nohayla",
    cne: "7984",
    name: "nohayla",
    email: "nohayla@gmail.com"
  }]
  for (let i = 0; i < users.length; i++) {
    await registerUser(users[i].cni, users[i].cne, users[i].name, users[i].email);
  }
}

// Example usage: Populate the contract with 10 fake users
populateUsers(3);