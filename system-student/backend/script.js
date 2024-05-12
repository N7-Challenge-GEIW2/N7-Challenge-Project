const Web3 = require('web3');
const faker = require('faker');
const contractABI = [...]; // Replace with your contract ABI
const contractAddress = '...'; // Replace with your contract address

// Connect to the Ethereum network
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to generate fake user data
// anas,younes nohayla
function generateFakeUser() {
  const cni = faker.random.alphaNumeric(10);
  const cne = faker.random.alphaNumeric(8);
  const name = faker.name.findName();
  const email = faker.internet.email();

  return { cni, cne, name, email };
}

// Function to register a user on the contract
async function registerUser(cni, cne, name, email) {
  const accounts = await web3.eth.getAccounts();
  await contract.methods.registerUser(cni, cne, email, name).send({ from: accounts[0] });
  console.log(`User registered: ${name} (${cni})`);
}

// Generate and register a specified number of fake users
async function populateUsers(numUsers) {
  for (let i = 0; i < numUsers; i++) {
    const fakeUser = generateFakeUser();
    await registerUser(fakeUser.cni, fakeUser.cne, fakeUser.name, fakeUser.email);
  }
}

// Example usage: Populate the contract with 10 fake users
populateUsers(10);