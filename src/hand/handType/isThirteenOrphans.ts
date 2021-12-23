import Meld from '../../meld/Meld';
import { MeldType } from '../../meld/MeldType';
import Tile from '../../tile/Tile';
import getTilesOccurrencesMap from '../../tile/getTilesOccurrencesMap';
import WinningHand from '../WinningHand';

/**
 * Determine if the array of Tiles is able to form ThirteenOrphans.
 * @param inputTiles input array of Tiles.
 * @returns true if the the array of Tiles could form ThirteenOrphans.
 */
export function isThirteenOrphansAsTilesArray(inputTiles: Tile[]): boolean {
  const copyOfInputTiles = inputTiles.slice();

  if (copyOfInputTiles.length !== Meld.NUMBER_OF_TILES_FOR_THIRTEEN_ORPHANS) {
    return false;
  }

  const map = getTilesOccurrencesMap(copyOfInputTiles);
  if (
    map['honor'] === undefined ||
    map['character'] === undefined ||
    map['dot'] === undefined ||
    map['bamboo'] === undefined
  ) {
    return false;
  }
  for (const suit in map) {
    if (suit === 'honor') {
      for (
        let value = Tile.ALL_SUIT_TYPES['honor']['minValue'];
        value <= Tile.ALL_SUIT_TYPES['honor']['maxValue'];
        value++
      ) {
        if (map[suit][value.toString()] < 1) return false;
      }
    } else {
      if (map[suit]['1'] === undefined || map[suit]['1'] < 1) {
        return false;
      }
      if (map[suit]['9'] === undefined || map[suit]['9'] < 1) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Convert the array of Tiles to a Meld.
 * @param inputTiles input array of Tiles.
 * @returns {Meld} a single Meld consisting of 14 Tiles.
 */
export function convertThirteenOrphansToMeld(inputTiles: Tile[]): Meld {
  const copyOfInputTiles = inputTiles.slice();

  if (!isThirteenOrphansAsTilesArray(copyOfInputTiles)) {
    throw new Error('Input Tiles array is not a valid ThirteenOrphan.');
  }

  const sortedTiles = sortTilesInThirteenOrphans(copyOfInputTiles);
  return new Meld(sortedTiles);
}

/**
 * Sort Tiles in an array, so that the Tiles to form the eyes could be arranged side by side.  (e.g. 🀀🀁🀂🀃🀄🀅🀆🀇🀏🀙🀡🀐🀘🀄 --> 🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘)
 * @param inputTiles input array of Tiles.
 * @returns {Tile []} a sorted array of Tiles of a ThirteenOrphans.
 */
export function sortTilesInThirteenOrphans(inputTiles: Tile[]): Tile[] {
  const copyOfInputTiles = inputTiles.slice();

  const tiles = [
    new Tile({ suit: 'honor', value: 1 }),
    new Tile({ suit: 'honor', value: 2 }),
    new Tile({ suit: 'honor', value: 3 }),
    new Tile({ suit: 'honor', value: 4 }),
    new Tile({ suit: 'honor', value: 5 }),
    new Tile({ suit: 'honor', value: 6 }),
    new Tile({ suit: 'honor', value: 7 }),
    new Tile({ suit: 'character', value: 1 }),
    new Tile({ suit: 'character', value: 9 }),
    new Tile({ suit: 'dot', value: 1 }),
    new Tile({ suit: 'dot', value: 9 }),
    new Tile({ suit: 'bamboo', value: 1 }),
    new Tile({ suit: 'bamboo', value: 9 }),
  ];

  const map: { [key: string]: number } = {};
  for (const tile of copyOfInputTiles) {
    const key = tile.toString();
    if (map[key] !== undefined) {
      map[key]++;
      if (map[key] === Meld.NUMBER_OF_TILES_FOR_EYES) {
        const tileToFormEyes = tile;
        for (let i = 0; i < tiles.length; i++) {
          if (tiles[i].isIdentical(tileToFormEyes)) {
            tiles.splice(i, 0, tileToFormEyes);
            return tiles;
          }
        }
      }
    } else {
      map[key] = 1;
    }
  }

  throw new Error('Error in sorting Tiles in ThirteenOrphans.');
}

/**
 * Determine if a Meld is a ThirteenOrphans.
 * @param inputMeld Meld to be evaluated.
 * @returns {boolean} true if the Meld is a ThirteenOrphans.
 */
export function isThirteenOrphansAsMeld(inputMeld: Meld): boolean {
  return inputMeld.getMeldType() === MeldType.THIRTEEN_ORPHANS;
}

/**
 * Determine if a WinningHand is a ThirteenOrphans.
 * @param inputWinningHand WinningHand to be evaluated.
 * @returns {boolean} true if the WinningHand is a ThirteenOrphans.
 */
export function isThirteenOrphansAsWinningHand(inputWinningHand: WinningHand): boolean {
  return inputWinningHand.getMelds().length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_THIRTEEN_ORPHANS;
}
