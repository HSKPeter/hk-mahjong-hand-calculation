import WinningHand from '../WinningHand';

export default function isAllHonors(inputWinningHand: WinningHand) {
  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    if (meld.getSuitType() !== 'honor') return false;
  }
  return true;
}
