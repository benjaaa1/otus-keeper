import { ethers, BigNumber } from 'ethers'

export declare type ContractsMap = {
  [name: string]: ethers.Contract
}

export type Trade = {
  id: string
  market: string
  optionType: number
  threshold: BigNumber
  positionId: number
  strikeId: number
  delta: BigNumber | null
}

export enum HEDGETYPE {
  NO_HEDGE = 0,
  USER_HEDGE = 1,
  DYNAMIC_DELTA_HEDGE = 2
}