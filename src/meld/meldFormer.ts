import Tile from '../tile/Tile';
import Meld from './Meld';

/**
 * This is a light-weighted function that takes an array of Unicode strings (e.g. ["🀀", "🀀", "🀀"]) to form a Meld.
 * @param inputTilesStrings an input array of strings that must be Unicode strings of Mahjong.
 * @returns the Meld formed.
 */
export default function meldFormer(inputTilesStrings: string[]): Meld {
  const tiles: Tile[] = [];
  for (const tile of inputTilesStrings) {
    tiles.push(new Tile(tile));
  }
  const meldFormed = new Meld(tiles);
  return meldFormed;
}
