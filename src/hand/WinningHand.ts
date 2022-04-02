import Tile from '../tile/Tile';
import Meld from '../meld/Meld';
// import countTilesOccurrences from "./countTilesOccurrences";
// import ExplorerOfWinningPermutations from "./depthFirstSearch/ExplorerOfWinningPermutations";
import FaanCalculator from '../calculateFaan/FaanCalculator';
import { MeldType } from '../meld/MeldType';
import getTilesOccurrencesMap from '../tile/getTilesOccurrencesMap';
import { Hand } from '..';

/**
 *
 */
class WinningHand {
  /**
   *
   */
  public static readonly NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM = 5;

  /**
   *
   */
  public static readonly NUMBER_OF_MELDS_NEEDED_FOR_THIRTEEN_ORPHANS = 1;

  /**
   *
   */
  #melds: Meld[];

  /**
   *
   * @param meldsInput
   */
  constructor(meldsInput: Meld[]) {
    const isSpecialWinningHand =
      meldsInput.length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_THIRTEEN_ORPHANS &&
      meldsInput[0].getMeldType() === MeldType.THIRTEEN_ORPHANS;

    if (isSpecialWinningHand) {
      this.#melds = meldsInput;
    } else {
      const hasInsufficientMelds = meldsInput.length < WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM;
      const hasExcessMelds = meldsInput.length > WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM;

      if (hasInsufficientMelds) throw new Error('A winning hand should have 5 melds.');
      if (hasExcessMelds) throw new Error('A winning hand should have 5 melds.');

      this.#melds = meldsInput;
    }

    if (!this.occurrenceOfEachTileIsWithinLimit()) {
      throw new Error('Invalid input.  Each tile should only have 4 occurrences at maximum.');
    }
  }

  /**
   *
   * @returns
   */
  public getMelds(): Meld[] {
    return this.#melds.slice();
  }

  /**
   *
   * @returns
   */
  public toString() {
    const isThirteenOrphans = this.#melds.length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_THIRTEEN_ORPHANS;
    if (isThirteenOrphans) {
      return this.#melds[0].toString();
    } else {
      let eyes = '';
      let result = '';
      for (const meld of this.#melds) {
        if (meld.getMeldType() === MeldType.EYES) {
          eyes = meld.toString();
          continue;
        }
        result += meld.toString() + ' ';
      }
      if (eyes.length === 0) {
        throw new Error('Eyes are not found in the Winning Hand');
      } else {
        return result + eyes;
      }
    }
  }

  /**
   *
   * @returns
   */
  public convertToTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (const meld of this.#melds) {
      meld.getTiles().forEach((tile) => tiles.push(tile));
    }
    return tiles;
  }

  /**
   *
   * @returns
   */
  public covertToHand(): Hand {
    return new Hand({ melds: this.#melds.slice() });
  }

  /**
   *
   * @returns
   */
  public calculateFaan(): number | "∞" {
    const {value: valueOfFaan} = FaanCalculator.calculate(this);
    return valueOfFaan;
  }

  /**
   *
   * @param inputTile
   * @returns
   */
  public contain(inputTile: Tile): boolean {
    const tiles = this.convertToTiles();
    for (const tile of tiles) {
      if (tile.isIdentical(inputTile)) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @returns
   */
  private occurrenceOfEachTileIsWithinLimit(): boolean {
    const tiles = this.convertToTiles();
    const map = getTilesOccurrencesMap(tiles);
    for (const suit in map) {
      // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
      if (map.hasOwnProperty(suit)) {
        for (const value in map[suit]) {
          // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
          if (map[suit].hasOwnProperty(value)) {
            if (map[suit][value] > 4) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
}

export default WinningHand;
