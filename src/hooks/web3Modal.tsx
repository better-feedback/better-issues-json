import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

export function useWeb3Modal() {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    const externalProvider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(externalProvider);

    setProvider(ethersProvider);
  }

  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }

  return { connectWallet, disconnectWallet, provider };
}
