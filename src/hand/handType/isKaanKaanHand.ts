import FaanCalculationConfig from '../../calculateFaan/FaanCalculationConfig';
import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a KaanKaanHand (Chinese: 坎坎糊).
 * @param inputWinningHand WinningHand to be evaluated.
 * @param config Configuration for Faan Calculation.
 * @returns true if the inputWinningHand is a KaanKaanHand (Chinese: 坎坎糊).
 */
export default function isKaanKaanHand(inputWinningHand: WinningHand, config?: FaanCalculationConfig) {
  if (config === undefined) {
    return false;
  }

  if (config.selfPick === undefined || config.fullyConcealedHand === undefined) {
    return false;
  }

  if (config.selfPick === false || config.fullyConcealedHand === false) {
    return false;
  }

  const melds = inputWinningHand.getMelds();
  for (let i = 0; i < melds.length - 1; i++) {
    if (melds[i].getMeldType() === MeldType.KONG || melds[i].getMeldType() === MeldType.CHOW) {
      return false;
    }
  }

  return true;
}
