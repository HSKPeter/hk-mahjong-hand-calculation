import WinningHand from '../WinningHand';
import isAllOneSuit from './isAllOneSuit';

/**
 * Determine if the WinningHand is a NineGates (Chinese: 九子連環).
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns true if the inputWinningHand is a NineGates (Chinese: 九子連環).
 */
export default function isNineGates(inputWinningHand: WinningHand) {
  // 111-2345678-999
  const map = [3, 1, 1, 1, 1, 1, 1, 1, 3];

  // Pre-requisite of a NineGates is consisting only one type of suit.
  if (!isAllOneSuit(inputWinningHand)) {
    return false;
  }

  const tiles = inputWinningHand.convertToTiles();

  for (const tile of tiles) {
    if (tile.getSuit() === 'honor') return false;

    const tileValue = tile.getValue();
    if (map[tileValue - 1] === 0) continue;

    map[tileValue - 1]--;
  }

  for (const value of map) {
    if (value !== 0) return false;
  }

  return true;
}
