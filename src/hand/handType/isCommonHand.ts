import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a CommonHand (Chinese: 平糊).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a CommonHand (Chinese: 平糊).
 */
export default function isCommonHand(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getMeldType() === MeldType.EYES) continue;
    if (meld.getMeldType() !== MeldType.CHOW) {
      return false;
    }
  }
  return true;
}
