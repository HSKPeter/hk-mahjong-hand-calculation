import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a SmallDragon (Chinese: 小三元).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a SmallDragon (Chinese: 小三元).
 */
export default function isSmallDragon(inputWinningHand: WinningHand) {
  // red dragon or green dragon or white dragon
  let pongsOrKongsOfDragons = 0;
  let hasEyesOfDragons = false;

  const melds = inputWinningHand.getMelds();
  for (const meld of melds) {
    const isDragon = meld.getSuitType() === 'honor' && meld.getTiles()[0].getValue() >= 5;

    if (meld.getMeldType() === MeldType.EYES) {
      if (isDragon) {
        hasEyesOfDragons = true;
      }
      continue;
    }

    if (meld.getMeldType() === MeldType.PONG || meld.getMeldType() === MeldType.KONG) {
      if (isDragon) {
        pongsOrKongsOfDragons++;
      }
    }
  }
  return pongsOrKongsOfDragons === 2 && hasEyesOfDragons;
}
