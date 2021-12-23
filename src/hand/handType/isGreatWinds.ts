import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a GreatWinds (Chinese: 大四喜).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a GreatWinds (Chinese: 大四喜).
 */
export default function isGreatWinds(inputWinningHand: WinningHand) {
  // red dragon or green dragon or white dragon
  let pongsOrKongsOfWinds = 0;

  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    const isWind = meld.getSuitType() === 'honor' && meld.getTiles()[0].getValue() <= 4;

    if (meld.getMeldType() === MeldType.EYES) continue;

    if (meld.getMeldType() === MeldType.PONG || meld.getMeldType() === MeldType.KONG) {
      if (isWind) pongsOrKongsOfWinds++;
    }
  }
  return pongsOrKongsOfWinds === 4;
}
