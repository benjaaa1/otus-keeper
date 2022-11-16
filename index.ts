import { EventBridgeEvent } from "aws-lambda";

import { AccountPortfolioBalance, PositionPnl } from "@lyrafinance/lyra-js";
import { fromBigNumber } from "./src/utils/format";
import { lyra } from './src/lyra';
import { vaults } from './src/query/vaults';

// export const handler = async (event: EventBridgeEvent<"otus-service-cron", any>) => {
export const handler = async () => {
  // get supported asset prices
  // get active vaults from subgraph (active, has hedge strategy, has trades)
  // get position information from lyra
  // get delta position
  // check delta threshold
  // send transaction (for now a notificatirron)

  const activeVaults = await vaults();

  console.log({ activeVaults })

  await activeVaults.map(async vault => {
    const { vaultTrades } = vault;
    const { positionId } = vault;
    const position = positionId;
  })

}

handler(); 