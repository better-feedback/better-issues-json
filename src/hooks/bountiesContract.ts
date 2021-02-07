import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWeb3Modal } from "./web3Modal";
import StandardBountiesArtifact from "../../artifacts/contracts/StandardBounties.sol/StandardBounties.json";

const bountiesContractAddress =
  process.env.NEXT_PUBLIC_BOUNTIES_CONTRACT_ADDRESS;
const bountiesContractABI = StandardBountiesArtifact.abi;
const approverAddresses = ["0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"];

export function useBountiesContract() {
  const { provider } = useWeb3Modal();
  const [bountiesContract, setBountiesContract] = useState<any>();

  useEffect(() => {
    if (provider && bountiesContractAddress && bountiesContractABI) {
      const bountiesContract = new ethers.Contract(
        bountiesContractAddress,
        StandardBountiesArtifact.abi,
        provider.getSigner(0)
      );
      setBountiesContract(bountiesContract);
    }
  }, [provider]);

  return bountiesContract;
}

export function useIssueAndContribute() {
  const bountiesContract = useBountiesContract();
  const [txStatus, setTxStatus] = useState("idle");

  async function issueAndContribute(
    issueId: string,
    contributionAmount: number
  ) {
    if (typeof bountiesContract === "undefined") {
      return;
    }

    const signerAddress = await bountiesContract.signer.getAddress();
    setTxStatus("pending");
    const txResponse = await bountiesContract.issueAndContribute(
      signerAddress,
      [signerAddress],
      approverAddresses,
      issueId,
      123456,
      // TODO: Allow different tokens
      ethers.constants.AddressZero,
      0,
      ethers.utils.parseEther(String(contributionAmount)),
      { value: ethers.utils.parseEther(String(contributionAmount)) }
    );
    const txReceipt = await txResponse.wait();
    setTxStatus(txReceipt.status ? "success" : "fail");
  }

  return { txStatus, issueAndContribute };
}

export function useBounty(bountyId: string) {
  const bountiesContract = useBountiesContract();
  const [bounty, setBounty] = useState<any>();

  useEffect(() => {
    fetchBounty();
  }, [bountiesContract]);

  async function fetchBounty() {
    if (bountiesContract) {
      const bounty = await bountiesContract.bounties(bountyId);
      setBounty(bounty);
    }
  }

  return { bounty, fetchBounty };
}
