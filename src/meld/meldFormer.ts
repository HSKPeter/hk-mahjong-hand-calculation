import Tile from '../tile/Tile';
import Meld from './Meld';

/**
 * This is a light-weighted function that takes an array if Unicode strings (e.g. ["🀀", "🀀", "🀀"]) to form a Meld.
 * @param inputTilesStrings
 * @returns meldFormed as Meld
 */
export default function meldFormer(inputTilesStrings: string[]): Meld {
  const tiles: Tile[] = [];
  for (const tile of inputTilesStrings) {
    tiles.push(new Tile(tile));
  }
  const meldFormed = new Meld(tiles);
  return meldFormed;
}
