import React, { useEffect, useState } from "react";

import { useWeb3Modal } from "../hooks/web3Modal";

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
      className="flex h-6 ml-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      aria-haspopup="true"
      onClick={signerAddress ? handleClickAddress : handleClickConnect}
    >
      {signerAddress || "Connect Wallet"}
    </button>
  );
}
