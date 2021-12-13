import Meld from './Meld';
import Tile from '../tile/Tile';
import tilesOccurrencesMap from '../tile/tilesOccurrencesMap';

export default function pong(inputTiles: Tile[]): Meld | null {
  const copyOfInputTiles = inputTiles.slice();

  const map = tilesOccurrencesMap(copyOfInputTiles);

  for (const suit in map) {
    if (map.hasOwnProperty(suit)) {
      for (const value in map[suit]) {
        if (map[suit].hasOwnProperty(value)) {
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
