import Tile from '../tile/Tile';
import countTilesOccurrences from '../tile/countTilesOccurrences';
import ExplorerOfWinningPermutations from '../breadthFirstSearch/ExplorerOfWinningPermutations';
import WinningHand from './WinningHand';
import { isThirteenOrphansAsTilesArray } from './handType/isThirteenOrphans';
import Meld from '../meld/Meld';
import HandConfig from './HandConfig';
import { MeldType } from '../meld/MeldType';

class Hand {
  /**
   * Minimum number of Tiles required in a Mahjong Hand.
   */
  private static readonly MIN_NUMBER_OF_TILES = 13;

  /**
   * Maximum number of Tiles accepted in a Mahjong Hand.
   */
  private static readonly MAX_NUMBER_OF_TILES = 18;

  /**
   * Unorganized tiles.
   */
  #unorganizedTiles: Tile[];

  /**
   * Melds formed.
   */
  #meldsFormed: Meld[];

  /**
   * All tiles from the array of unorganized Tiles and the array of Melds formed.
   */
  #allTiles: Tile[];

  /**
   * Construct a Hand.
   * @param inputConfig configuration of constructing a Hand.
   */
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

  /**
   * Access the unorganized Tiles.
   * @returns {Tile []} the unorganized Tiles.
   */
  public getUnorganizedTiles(): Tile[] {
    return this.#unorganizedTiles.slice();
  }

  /**
   * Access the Melds formed.
   * @returns {Meld []} the Melds formed.
   */
  public getMeldsFormed(): Meld[] {
    return this.#meldsFormed.slice();
  }

  /**
   * Access all Tiles.
   * @returns {Tile []} an array including all Tiles (either unorganized or from the formed Melds).
   */
  public getAllTiles(): Tile[] {
    return this.#allTiles.slice();
  }

  /**
   * Access the string that could represent the Tiles of the Hand.
   * @returns {string} a string that represent the Tiles of the Hand.
   */
  public toString(): string {
    let result = '';
    for (const tile of this.#allTiles) {
      result += tile.toString();
    }
    return result;
  }

  /**
   * Determine if two Hands are the same.
   * @param handToBeCompared Hand to be compared.
   * @returns {boolean} true if the two Hands are the same..
   */
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

  /**
   * Determine if the Hand is a ThirteenOrphans.
   * @returns {boolean} true if the Hand is a ThirteenOrphans.
   */
  public isThirteenOrphans() {
    try {
      return isThirteenOrphansAsTilesArray(this.#unorganizedTiles);
    } catch (err) {
      return false;
    }
  }

  /**
   * Determine if the Hand is a WinningHand.
   * @returns  {boolean} true if the Hand is a WinningHand.
   */
  public isWinningHand(): boolean {
    try {
      if (this.isThirteenOrphans()) return true;
      const explorer = new ExplorerOfWinningPermutations(this);
      const winningPermutations = explorer.getWinningPermutations();
      return winningPermutations.length > 0;
    } catch (err) {
      return false;
    }
  }

  /**
   * Find all possible winning permutations of the Hand.
   * @returns {WinningHand []} all possible winning permutations of the Hand.
   */
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
