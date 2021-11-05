import React, { useState } from "react";
import Blockies from "react-blockies";
import * as nearAPI from "near-api-js";
import { getConfig } from "../utils/config";

async function initNear() {
  const nearConfig = getConfig("testnet");
  // Initializing connection to the NEAR node.
  const near = await nearAPI.connect({
    ...nearConfig,
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  });

  console.log(near);

  // Initializing Wallet based Account. It can work with NEAR TestNet wallet that
  // is hosted at https://wallet.nearprotocol.com
  const wallet = new nearAPI.WalletConnection(near);
  const account = wallet.account();
  if (account.accountId) {
    return account;
  } else {
    wallet.requestSignIn(
      "example-contract.testnet", // contract requesting access
      "Better" // optional
      // "http://YOUR-URL.com/success", // optional
      // "http://YOUR-URL.com/failure" // optional
    );
    return wallet.account();
  }
}

export default function ConnectWallet() {
  const [signerAddress, setSignerAddress] = useState<string>("");

  return (
    <button
      className="flex items-center py-0.5 text-sm font-medium text-gray-600 bg-better-purple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      aria-haspopup="true"
      onClick={async () => {
        try {
          const account = await initNear();
          setSignerAddress(account.accountId);
        } catch (error) {
          //
        }
      }}
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
        {signerAddress ? signerAddress : "Connect Wallet"}
      </div>
    </button>
  );
}
