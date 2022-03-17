import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a MixedOrphans (Chinese: 花么).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a MixedOrphans (Chinese: 花么).
 */
export default function isMixedOrphans(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getMeldType() === MeldType.CHOW) return false;
    const isHonor = meld.getSuitType() === 'honor';
    const hasValueOfOneOrNine = meld.getTiles()[0].getValue() === 1 || meld.getTiles()[0].getValue() === 9;
    if (!hasValueOfOneOrNine && !isHonor) return false;
  }
  return true;
}
