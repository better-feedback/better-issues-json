import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";

import { useWeb3Modal } from "../hooks/web3Modal";

const truncateAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export default function ConnectWallet() {
  const [signerAddress, setSignerAddress] = useState<string>("");
  const { connectWallet, disconnectWallet, provider } = useWeb3Modal();

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      signer.getAddress().then((address) => setSignerAddress(address));
    } else {
      setSignerAddress("");
    }
  }, [provider]);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const handleClickAddress = () => {
    disconnectWallet();
  };

  return (
    <button
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      aria-haspopup="true"
      onClick={signerAddress ? handleClickAddress : handleClickConnect}
      title={signerAddress ? "Click to Disconnect" : "Click to Connect"}
    >
      {signerAddress && (
        <div className="rounded-full border-better-white mx-1 my-0.5">
          <Blockies
            className="rounded-full"
            seed={signerAddress.toLowerCase()}
            size={8}
            scale={3}
          />
        </div>
      )}
      <div
        className={`mr-3 ${
          !signerAddress && "ml-3"
        } align-middle text-better-violet`}
      >
        {signerAddress ? truncateAddress(signerAddress) : "Connect Wallet"}
      </div>
    </button>
  );
}
