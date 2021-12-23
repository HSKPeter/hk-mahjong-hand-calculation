import Tile from './Tile';

/**
 * Count the occurrences of a particular Tile in an array of Tiles.
 * @param tiles the array of Tile.
 * @param targetTile the Tile of which the number of occurrences has to be counted.
 * @returns {number} occurrence of the targetTile.
 */
export default function countTilesOccurrences(tiles: Tile[], targetTile: Tile): number {
  let result = 0;
  for (const tile of tiles) {
    if (targetTile.isIdentical(tile)) {
      result++;
    }
  }
  return result;
}
