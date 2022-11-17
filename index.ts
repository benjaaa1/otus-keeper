import { EventBridgeEvent } from "aws-lambda";
import { BigNumber } from "ethers";
import { loadOtusContracts, getOtusContractInfo } from "./src/contracts/contracts";
import { getDelta } from "./src/lyra";
import { vaults } from './src/query/vaults';
import { HEDGETYPE, Trade } from "./src/utils/types";
import { provider } from './src/utils/utils';

export const handler = async (event: EventBridgeEvent<"otus-service-cron", any>) => {
  // export const handler = async () => {
  // get supported asset prices
  // get active vaults from subgraph (active, has hedge strategy, has trades)
  // get position information from lyra
  // get delta position
  // check delta threshold
  // send transaction (for now a notificatirron)

  const _provider = await provider();

  await loadOtusContracts();

  const activeVaults = await vaults(HEDGETYPE.DYNAMIC_DELTA_HEDGE, _provider);

  const trades = activeVaults.reduce((accum, vault) => {
    const { id, strategy: { dynamicHedgeStrategy }, vaultTrades } = vault;
    const { threshold } = dynamicHedgeStrategy;
    const trades: Trade[] = vaultTrades.map(vaultTrade => {
      const { optionType, positionId, strikeId } = vaultTrade;
      return {
        id,
        threshold,
        market: 'ETH',
        optionType,
        positionId,
        strikeId
      }
    });
    return accum.concat(trades);
  }, []);

  const tradesToHedge = await Promise.all(trades.filter(async (trade) => {
    const { positionId, threshold, optionType } = trade;
    const delta = await getDelta('ETH', positionId);

    if (threshold > delta) { // check on optiontype too
      return trade;
    }

  }));

  const otusContract = await getOtusContractInfo('OtusVault', _provider);

  await Promise.all(tradesToHedge.map(async (trade) => {
    const { id } = trade;
    const otusVaultInstance = otusContract.attach(id);

    const tx = await otusVaultInstance.dynamicDeltaHedge();
    return tx;
  }));

}

// handler(); 