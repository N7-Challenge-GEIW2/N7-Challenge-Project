require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "volta",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true, // Allow unlimited contract size for hardhat network
    },
    volta: {
      url: "https://volta-rpc.energyweb.org",
      accounts: [`0xee4c5c42dc49df382e4041121a02e17f24f0608eb5b96b1e393b78ee0c2cabf9`],
      allowUnlimitedContractSize: true, // Allow unlimited contract size for hardhat network
      gas: 50000000,
      gasPrice: 10000000000000000,
    },
    localhost: {
      allowUnlimitedContractSize: true, // Allow unlimited contract size for hardhat network
    }
  }
};
