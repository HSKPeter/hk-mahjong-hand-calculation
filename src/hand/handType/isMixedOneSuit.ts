import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a MixedOneSuit (Chinese: 混一色).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a MixedOneSuit (Chinese: 混一色).
 */
export default function isMixedOneSuit(inputWinningHand: WinningHand) {
  let containHonor = false;
  let suit: null | string = null;

  const melds = inputWinningHand.getMelds();
  for (let i = 0; i < melds.length; i++) {
    const meldSuit = melds[i].getSuitType();
    if (meldSuit === "honor"){
      containHonor = true;
      continue;      
    } else if (suit === null){
      suit = meldSuit
    } else {
      if (meldSuit !== suit){
        return false;
      }
    }
  }
  return containHonor;
}
