import React, { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { getAccount, connectWallet } from '../utils/near'

export default function ConnectWallet() {
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    getAccount().then((account) => {
      setAddress(account.accountId)
    })
  }, [])

  return (
    <button
      className="flex items-center py-0.5 text-sm font-medium text-gray-600 bg-better-purple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      aria-haspopup="true"
      onClick={async () => {
        connectWallet().then((account) => setAddress(account.accountId))
      }}
    >
      {address && (
        <div className="rounded-full border-better-white mx-1 my-0.5">
          <Blockies
            className="rounded-full"
            seed={address.toLowerCase()}
            size={8}
            scale={3}
          />
        </div>
      )}
      <div
        className={`mr-3 ${!address && 'ml-3'} align-middle text-better-violet`}
      >
        {address ? address : 'Connect Wallet'}
      </div>
    </button>
  )
}
