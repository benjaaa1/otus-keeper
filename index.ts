import { EventBridgeEvent } from "aws-lambda";
import { vaults } from './src/query/vaults';

export const handler = async (event: EventBridgeEvent<"otus-service-cron", any>) => {
  // export const handler = async () => {
  // get supported asset prices
  // get active vaults from subgraph (active, has hedge strategy, has trades)
  // get position information from lyra
  // get delta position
  // check delta threshold
  // send transaction (for now a notificatirron)

  const activeVaults = await vaults();

  console.log({ activeVaults })

}

// handler(); 