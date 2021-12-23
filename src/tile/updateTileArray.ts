import Meld from '../meld/Meld';
import Tile from './Tile';

/**
 * Update the Tiles array after forming a particular Meld.
 * @param inputTiles the array of Tiles has to be updated.
 * @param inputMeld the Meld has to be formed.
 * @returns {Tile []} the updated Tiles array after forming the specified Meld.
 */
export default function updateTileArray(inputTiles: Tile[], inputMeld: Meld): Tile[] {
  const copyOfInputTiles = inputTiles.slice();
  const tilesInMeld = inputMeld.getTiles();

  for (const tileInMeld of tilesInMeld) {
    for (let i = 0; i < copyOfInputTiles.length; i++) {
      if (copyOfInputTiles[i].isIdentical(tileInMeld)) {
        copyOfInputTiles.splice(i, 1);
        break;
      }
    }
  }
  return copyOfInputTiles;
}
