import { task, HardhatUserConfig } from "hardhat/config";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.7.5",
  networks: {
    // hardhat: {
    //   chainId: 5777,
    //   // from: "a3a0cc60db27052a4c65063c2a007dec8ac011e21e562d0cdef7bc4aebc6960c",
    //   // accounts: ["a3a0cc60db27052a4c65063c2a007dec8ac011e21e562d0cdef7bc4aebc6960c"]
    //   // accounts: ["e9c412f7554ef285917a6f0b6f057b318442fb5264a9716b08b3018333e84670"]
    // },
  }
};

export default config;
