import Tile from '../tile/Tile';
import countTilesOccurrences from '../tile/countTilesOccurrences';
import ExplorerOfWinningPermutations from '../depthFirstSearch/ExplorerOfWinningPermutations';
import WinningHand from './WinningHand';
import { isThirteenOrphansAsTilesArray } from './handType/isThirteenOrphans';
import Meld from '../meld/Meld';
import HandConfig from './HandConfig';
import { MeldType } from '../meld/MeldType';

class Hand {
  private static readonly MIN_NUMBER_OF_TILES = 13;
  private static readonly MAX_NUMBER_OF_TILES = 18;
  #unorganizedTiles: Tile[];
  #meldsFormed: Meld[];
  #allTiles: Tile[];

  constructor(inputConfig: HandConfig) {
    const hasInsufficientParams = inputConfig.tiles === undefined && inputConfig.melds === undefined;

    if (hasInsufficientParams) {
      throw new Error('Insufficient parameters to instantiate a Hand.');
    }

    if (inputConfig.tiles) {
      this.#unorganizedTiles = inputConfig.tiles.slice();
    } else {
      this.#unorganizedTiles = [];
    }

    if (inputConfig.melds) {
      if (inputConfig.tiles && inputConfig.tiles.length > 0) {
        inputConfig.melds.forEach((meld) => {
          if (meld.getMeldType() === MeldType.EYES) {
            throw new Error('Eyes should not be formed if there are tiles remain unorganized.');
          }

          if (meld.getMeldType() === MeldType.THIRTEEN_ORPHANS) {
            throw new Error(
              'There should be no tiles remain unorganized if there the Meld is in the type of THIRTEEN_ORPHANS.',
            );
          }
        });
      }

      this.#meldsFormed = inputConfig.melds.slice();
    } else {
      this.#meldsFormed = [];
    }

    this.#allTiles = [];
    for (const meld of this.#meldsFormed) {
      this.#allTiles = this.#allTiles.concat(meld.getTiles());
    }
    this.#allTiles = this.#allTiles.concat(this.#unorganizedTiles);

    if (this.#allTiles.length < Hand.MIN_NUMBER_OF_TILES) {
      throw new Error('Short Hand.');
    } else if (this.#allTiles.length > Hand.MAX_NUMBER_OF_TILES) {
      throw new Error('Long Hand.');
    }
  }

  public getUnorganizedTiles(): Tile[] {
    return this.#unorganizedTiles.slice();
  }

  public getMeldsFormed(): Meld[] {
    return this.#meldsFormed.slice();
  }

  public getAllTiles(): Tile[] {
    return this.#allTiles.slice();
  }

  public toString(): string {
    let result = '';
    for (const tile of this.#allTiles) {
      result += tile.toString();
    }
    return result;
  }

  public isIdentical(handToBeCompared: Hand) {
    if (this.#unorganizedTiles.length !== handToBeCompared.getUnorganizedTiles().length) {
      return false;
    }
    for (const tile of this.#unorganizedTiles) {
      if (
        countTilesOccurrences(this.#unorganizedTiles, tile) !==
        countTilesOccurrences(handToBeCompared.getUnorganizedTiles(), tile)
      ) {
        return false;
      }
    }
    return true;
  }

  public isSpecialWinningHand() {
    try {
      return isThirteenOrphansAsTilesArray(this.#unorganizedTiles);
    } catch (err) {
      return false;
    }
  }

  public isWinningHand(): boolean {
    try {
      if (this.isSpecialWinningHand()) return true;
      const explorer = new ExplorerOfWinningPermutations(this);
      const winningPermutations = explorer.getWinningPermutations();
      return winningPermutations.length > 0;
    } catch (err) {
      return false;
    }
  }

  public findAllWinningPermutations(): WinningHand[] {
    try {
      const explorer = new ExplorerOfWinningPermutations(this);
      const result = explorer.getWinningPermutations();
      return result;
    } catch (err) {
      return [];
    }
  }
}

export default Hand;
