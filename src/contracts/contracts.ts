import { ethers } from 'ethers'
import { provider } from '../utils/utils';

const contractListPromise = import('./hardhat_contracts.json');

const config = { deployedContracts: {} };

export const loadOtusContracts = async () => {
  config.deployedContracts = (await contractListPromise).default ?? {};
};

export const getOtusContractInfo = async (contract: string, _provider: ethers.providers.JsonRpcProvider) => {
  const { chainId, name: network } = await _provider.getNetwork();
  const _contract = config.deployedContracts[chainId][network]['contracts'][contract];
  return new ethers.Contract(_contract.address, _contract.abi, _provider);
}

export const _contract = (address, abi, _provider: ethers.providers.JsonRpcProvider) => {
  const contract = new ethers.Contract(address, abi, _provider);
  return contract;
}

const getSynthetixContractInfo = (network, contract) => {
  const _contractABI = synthetix.getSource({ network, contract });
  const _contract = synthetix.getTarget({ network, contract });
  return {
    address: _contract.address,
    abi: _contractABI.abi
  }
}

