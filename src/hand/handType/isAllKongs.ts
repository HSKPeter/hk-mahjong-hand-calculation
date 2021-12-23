import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is an AllKongs (Chinese: 十八羅漢).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is an AllKongs (Chinese: 十八羅漢).
 */
export default function isAllKongs(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getMeldType() === MeldType.EYES) continue;
    if (meld.getMeldType() !== MeldType.KONG) {
      return false;
    }
  }
  return true;
}
