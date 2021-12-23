import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is an Orphans (Chinese: 么九).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is an Orphans (Chinese: 么九).
 */
export default function isOrphans(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getMeldType() === MeldType.CHOW) return false;
    if (meld.getSuitType() === 'honor') return false;
    const hasValueOfOneOrNine = meld.getTiles()[0].getValue() === 1 || meld.getTiles()[0].getValue() === 9;
    if (!hasValueOfOneOrNine) return false;
  }
  return true;
}
