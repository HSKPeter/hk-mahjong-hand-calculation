import Meld from './Meld';
import Tile from '../tile/Tile';
import getTilesOccurrencesMap from '../tile/getTilesOccurrencesMap';

/**
 * (Chinese: 碰) Form the Meld consisting of three identical Tiles.
 * @param inputTiles array of Tiles.
 * @returns the Pong formed.  Null if the Tiles array is unable to form the Pong.
 */
export default function pong(inputTiles: Tile[]): Meld | null {
  const copyOfInputTiles = inputTiles.slice();

  const map = getTilesOccurrencesMap(copyOfInputTiles);

  for (const suit in map) {
    // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
    if (map.hasOwnProperty(suit)) {
      for (const value in map[suit]) {
        if (map[suit].hasOwnProperty(value)) {
          // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
          if (map[suit][value] === Meld.NUMBER_OF_TILES_FOR_PONG) {
            const tiles = [];
            for (let i = 0; i < Meld.NUMBER_OF_TILES_FOR_PONG; i++) {
              tiles.push(new Tile({ suit, value: parseInt(value, 10) }));
            }
            const meldFormed = new Meld(tiles);
            return meldFormed;
          }
        }
      }
    }
  }
  return null;
}
