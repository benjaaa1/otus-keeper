import { ethers, BigNumber } from 'ethers'
import Lyra, { Strike, Quote, Market, Position } from '@lyrafinance/lyra-js'
import { fromBigNumber } from './utils/format'

const provider = new ethers.providers.InfuraProvider(10, process.env.INFURA_ID)

export const lyra = new Lyra({ provider })

export const getLyraMarkets = async () => await lyra.markets()

export type LyraStrike = {
  market: string
  selectedOptionType: number | 0
  quote: Quote
} & Strike

export type LyraStrikeMapping = {
  [key: number]: LyraStrike[]
}

export type LyraBoard = {
  id: number
  name: string
  expiryTimestamp: number
  baseIv: BigNumber
  strikes: Strike[]
  strikesByOptionTypes?: LyraStrikeMapping
  marketName: string
}

export type LyraMarket = {
  address: string
  name: string
  isPaused: boolean
  liveBoards: LyraBoard[]
}

export const markets = async (): Promise<Market[]> => await lyra.markets()

export const getDelta = async (market: string, positionId: number): Promise<number> => {

  const position: Position = await lyra.position(market, positionId);

  const { delta }: { delta: BigNumber } = position;

  return fromBigNumber(delta);

}