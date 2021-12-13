import Tile from './Tile';

export default function countTilesOccurrences(tiles: Tile[], targetTile: Tile) {
  let result = 0;
  for (const tile of tiles) {
    if (targetTile.isIdentical(tile)) {
      result++;
    }
  }
  return result;
}
