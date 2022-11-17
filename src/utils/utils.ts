import { ethers } from 'ethers'
import { ContractsMap } from './types'
import {
  FUTURES_ENDPOINT_MAINNET,
  FUTURES_ENDPOINT_TESTNET,
  OTUS_ENDPOINT_MAINNET,
  OTUS_ENDPOINT_TESTNET,
  OTUS_ENDPOINT_LOCALHOST,
} from './constants'

export const provider = async () => {
  const env = process.env.NODE_ENV;
  console.log({ env })
  if (env == 'production' || env == 'dev') {
    return new ethers.providers.InfuraProvider(process.env.INFURA_ID)
  } else {
    return new ethers.providers.JsonRpcProvider('http://localhost:8545');
  }

}

export const getOtusEndpoint = (
  network: ethers.providers.Network | null | undefined
): string => {
  console.log({ chainId: network?.chainId, OTUS_ENDPOINT_LOCALHOST })
  return network && network.chainId === 10
    ? OTUS_ENDPOINT_MAINNET
    : network && network.chainId === 420
      ? OTUS_ENDPOINT_TESTNET
      : OTUS_ENDPOINT_LOCALHOST
}
