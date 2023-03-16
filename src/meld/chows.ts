import Meld from './Meld';
import Tile from '../tile/Tile';
import getTilesOccurrencesMap from '../tile/getTilesOccurrencesMap';

/**
 * (Chinese: 上) Form the Meld consisting of three Tiles all of the same suit (except honor suit), in numerical sequence.
 * @param inputTiles array of Tiles.
 * @returns an array containing all possible Chows that could be formed.
 */
export default function chows(inputTiles: Tile[]): Meld[] {
  const copyOfInputTiles = inputTiles.slice();

  const map = getTilesOccurrencesMap(copyOfInputTiles);

  const melds = [];

  for (const suit in map) {
    if (suit === 'honor') {
      continue;
    }

    for (const value in map[suit]) {
      if (parseInt(value, 10) > Tile.ALL_SUIT_TYPES[suit]['maxValue'] - 2) {
        continue;
      }
      if (
        map[suit][value] !== undefined &&
        map[suit][parseInt(value, 10) + 1] !== undefined &&
        map[suit][parseInt(value, 10) + 2] !== undefined
      ) {
        const tile1 = new Tile({ suit, value: parseInt(value, 10) });
        const tile2 = new Tile({ suit, value: parseInt(value, 10) + 1 });
        const tile3 = new Tile({ suit, value: parseInt(value, 10) + 2 });
        const meldFormed = new Meld([tile1, tile2, tile3]);
        melds.push(meldFormed);
      }
    }
  }
  return melds;
}
