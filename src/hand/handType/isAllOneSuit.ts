import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is an AllOneSuit (Chinese: 清一色).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is an AllOneSuit (Chinese: 清一色).
 */
export default function isAllOneSuit(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (let i = 0; i < melds.length - 1; i++) {
    if (melds[i].getSuitType() !== melds[i + 1].getSuitType()) {
      return false;
    }
  }
  return true;
}
