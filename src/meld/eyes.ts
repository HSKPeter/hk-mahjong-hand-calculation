import Meld from './Meld';
import { MeldType } from './MeldType';
import Tile from '../tile/Tile';

/**
 * (Chinese: 做眼) Form the Meld consisting of two identical Tiles.
 * @param inputTiles array of Tiles.
 * @returns the Eyes formed.  Null if the Tiles array is unable to form the Eyes.
 */
export default function eyes(inputTiles: Tile[]): Meld | null {
    const copyOfInputTiles = inputTiles.slice();
    for (let i = 0; i < copyOfInputTiles.length; i++) {
        for (let j = 0; j < copyOfInputTiles.length; j++) {
            if ( i !== j && copyOfInputTiles[i].isIdentical(copyOfInputTiles[j])) {
                return new Meld([copyOfInputTiles[i], copyOfInputTiles[j]]);
            }
        }
    }
    return null;
}

export function hasOnePairOfEyes(inputMelds: Meld[]): boolean {
    let numberOfPairOfEyes = 0;
    for (const meld of inputMelds) {
        if (meld.getMeldType() === MeldType.EYES) {
            numberOfPairOfEyes++;
        }
    }
    return numberOfPairOfEyes === 1;
}
