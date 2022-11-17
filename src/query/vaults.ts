import request, { gql } from 'graphql-request'
import { ethers } from 'ethers'

import { getOtusEndpoint, provider } from '../utils/utils';

export const vaults = async (hedgeType: number, _provider: ethers.providers.JsonRpcProvider) => {

  const _network = await _provider.getNetwork();

  const otusEndpoint = getOtusEndpoint(_network)

  const response = await request(
    otusEndpoint,
    gql`
      query ($hedgeType: hedgeType) {
        vaults(where: {
          hedgeType: $hedgeType,
          isActive: true,
          isPublic: true,
          vaultTrades: { _gt: 0 }
        }) {
          id
          isActive
          isPublic
          strategy {
            id
            hedgeType
            dynamicHedgeStrategy {
              threshold
              period
            }
          }
          vaultTrades {
            id
            strikeId
            positionId
            optionType
          }
        }
      }
    `,
    { hedgeType: hedgeType }
  );

  return response;

}