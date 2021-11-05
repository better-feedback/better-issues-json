import { connect, keyStores, WalletConnection } from 'near-api-js'
import { getConfig } from './config'

const getNearWallet = async () => {
  const nearConfig = getConfig('mainnet')
  const near = await connect({
    ...nearConfig,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  })

  const wallet = new WalletConnection(near, '')
  return wallet
}

export const getAccount = async () => {
  const wallet = await getNearWallet()
  const account = wallet.account()

  return account
}

export const connectWallet = async () => {
  const wallet = await getNearWallet()
  wallet.requestSignIn(
    'better.near', // contract requesting access
    'Better' // optional
    // "http://YOUR-URL.com/success", // optional
    // "http://YOUR-URL.com/failure" // optional
  )
  return wallet.account()
}
