import TileOccurrencesMap from './TileOccurrencesMap';
import Tile from './Tile';

/**
 * Get an object that maps the numbers of occurrences of Tiles.
 * @param inputTiles an array of Tiles.
 * @returns {TileOccurrencesMap} the object that maps the numbers of occurrences of Tiles.
 */
export default function getTilesOccurrencesMap(inputTiles: Tile[]): TileOccurrencesMap {
  const copyOfInputTiles = inputTiles.slice();

  const map: TileOccurrencesMap = {};

  for (const tile of copyOfInputTiles) {
    const tileSuit = tile.getSuit();
    const tileValue = tile.getValue();

    if (map[tileSuit] === undefined) {
      map[tileSuit] = {};
    }

    if (map[tileSuit][tileValue] === undefined) {
      map[tileSuit][tileValue] = 1;
    } else {
      map[tileSuit][tileValue]++;
      if (map[tileSuit][tileValue] > Tile.MAX_OCCURRENCE_IN_A_MAHJONG_SET) {
        throw new Error(
          `Invalid input of tiles.  Each tile should only have ${Tile.MAX_OCCURRENCE_IN_A_MAHJONG_SET} occurrences at maximum in a mahjong set.`,
        );
      }
    }
  }

  return map;
}
