import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const IS_SERVER = typeof window === "undefined";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID,
    },
  },
};

const web3Modal = IS_SERVER
  ? null
  : new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

export function useWeb3Modal() {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal?.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    if (IS_SERVER) {
      return;
    }

    const externalProvider = await web3Modal?.connect();
    const ethersProvider = new ethers.providers.Web3Provider(externalProvider);

    setProvider(ethersProvider);
  }

  function disconnectWallet() {
    if (IS_SERVER) {
      return;
    }

    web3Modal?.clearCachedProvider();
    setProvider(undefined);
  }

  return { connectWallet, disconnectWallet, provider };
}
