import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is an AllHonors (Chinese: 字一色).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is an AllHonors (Chinese: 字一色).
 */
export default function isAllHonors(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getSuitType() !== 'honor') return false;
  }
  return true;
}
