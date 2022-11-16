import request, { gql } from 'graphql-request'
import { getOtusEndpoint, provider } from '../utils/utils';

export const vaults = async () => {

  const _provider = await provider();
  const _network = await _provider.getNetwork();

  const otusEndpoint = getOtusEndpoint(_network)

  const response = await request(
    otusEndpoint,
    gql`
      query {
        vaults {
          id
          isActive
          isPublic
          strategy {
                id
                latestUpdate
                hedgeType
                vaultStrategy {
                  id
                  collatBuffer
                }
              }
              vaultTrades {
                id
                strikeId
                positionId
                premiumEarned
                strikePrice
                openedAt
                expiry
                optionType
              }
        }
      }
    `,
    {}
  );

  return response;

}