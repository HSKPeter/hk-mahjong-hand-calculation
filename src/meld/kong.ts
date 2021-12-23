import Meld from './Meld';
import Tile from '../tile/Tile';
import getTilesOccurrencesMap from '../tile/getTilesOccurrencesMap';

/**
 * (Chinese: 槓) Form the Meld consisting of four identical Tiles.
 * @param inputTiles array of Tiles.
 * @returns the Kong formed.  Null if the Tiles array is unable to form the Kong.
 */
export default function kong(inputTiles: Tile[]): Meld | null {
  const copyOfInputTiles = inputTiles.slice();

  const map = getTilesOccurrencesMap(copyOfInputTiles);

  for (const suit in map) {
    // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
    if (map.hasOwnProperty(suit)) {
      for (const value in map[suit]) {
        // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
        if (map[suit].hasOwnProperty(value)) {
          if (map[suit][value] === Meld.NUMBER_OF_TILES_FOR_KONG) {
            const tiles = [];
            for (let i = 0; i < Meld.NUMBER_OF_TILES_FOR_KONG; i++) {
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
