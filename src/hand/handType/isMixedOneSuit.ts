import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a MixedOneSuit (Chinese: 混一色).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a MixedOneSuit (Chinese: 混一色).
 */
export default function isMixedOneSuit(inputWinningHand: WinningHand) {
  let containHonor = false;
  const melds = inputWinningHand.getMelds();
  for (let i = 0; i < melds.length - 1; i++) {
    if (melds[i].getSuitType() === 'honor' || melds[i + 1].getSuitType() === 'honor') {
      containHonor = true;
      continue;
    }
    if (melds[i].getSuitType() !== melds[i + 1].getSuitType()) {
      return false;
    }
  }
  return containHonor;
}
