import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils"

export const fromBigNumber = (
  number: BigNumber,
  decimals: number = 18
): number => {
  return parseFloat(formatUnits(number.toString(), decimals))
}
