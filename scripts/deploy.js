const hre = require("hardhat");

async function main() {
  const StandardBounties = await hre.ethers.getContractFactory(
    "StandardBounties"
  );
  const standardBounties = await StandardBounties.deploy();

  await standardBounties.deployed();

  console.log("StandardBounties deployed to:", standardBounties.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
