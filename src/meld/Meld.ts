import { MeldType } from './MeldType';
import Tile from '../tile/Tile';
import { isThirteenOrphansAsTilesArray, sortTilesInThirteenOrphans } from '../hand/handType/isThirteenOrphans';

/**
 * This class represents Meld, which is a group of tiles that serves as a basic unit of forming a WinningHand.
 */
export default class Meld {
  /**
   * The Eyes Meld should only consist of 2 Tiles.
   */
  public static readonly NUMBER_OF_TILES_FOR_EYES = 2;

  /**
   * The Chow Meld should only consist of 3 Tiles.
   */
  public static readonly NUMBER_OF_TILES_FOR_CHOW = 3;

  /**
   * The Pong Meld should only consist of 3 Tiles.
   */
  public static readonly NUMBER_OF_TILES_FOR_PONG = 3;

  /**
   * The Kong Meld should only consist of 4 Tiles.
   */
  public static readonly NUMBER_OF_TILES_FOR_KONG = 4;

  /**
   * The ThirteenOrphans Meld should only consist of 14 Tiles.
   */
  public static readonly NUMBER_OF_TILES_FOR_THIRTEEN_ORPHANS = 14;

  /**
   * The array of Tiles that form the Meld.
   */
  #tiles: Tile[];

  /**
   * Suit type of the Meld.
   */
  #suitType: string;

  /**
   * Meld type of the Meld.
   */
  #meldType: MeldType;

  /**
   * Construct the Meld.
   * @param inputTiles the input array of Tiles.
   */
  constructor(inputTiles: Tile[]) {
    if (isThirteenOrphansAsTilesArray(inputTiles)) {
      this.#meldType = MeldType.THIRTEEN_ORPHANS;
      this.#tiles = sortTilesInThirteenOrphans(inputTiles);
      this.#suitType = 'ThirteenOrphans';
      return;
    }

    const allTilesAreInSameSuit = this.allTilesAreInSameSuit(inputTiles);
    if (!allTilesAreInSameSuit) {
      throw new Error('Invalid input of Meld. ll tiles in a meld must have the same suit.');
    }

    if (this.isValidEyes(inputTiles)) {
      this.#meldType = MeldType.EYES;
    } else if (this.isValidChow(inputTiles)) {
      this.#meldType = MeldType.CHOW;
    } else if (this.isValidPong(inputTiles)) {
      this.#meldType = MeldType.PONG;
    } else if (this.isValidKong(inputTiles)) {
      this.#meldType = MeldType.KONG;
    } else {
      throw new Error('Invalid input of Meld.');
    }

    if (this.#meldType === MeldType.CHOW) {
      this.#tiles = inputTiles.sort((tile1, tile2) => tile1.getValue() - tile2.getValue());
    } else {
      this.#tiles = inputTiles;
    }

    this.#suitType = inputTiles[0].getSuit();
  }

  public getTiles(): Tile[] {
    return this.#tiles.slice();
  }

  public getMeldType(): MeldType {
    return this.#meldType;
  }

  public getSuitType(): string {
    return this.#suitType;
  }

  public toString(): string {
    let result = '';
    for (const tile of this.#tiles) {
      result += tile.toString();
    }
    return result;
  }

  public isIdentical(meldInput: Meld) {
    const isSameMeldType = this.#meldType.valueOf() === meldInput.getMeldType().valueOf();
    if (isSameMeldType) {
      for (let i = 0; i < this.#tiles.length; i++) {
        if (!this.#tiles[i].isIdentical(meldInput.getTiles()[i])) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  private isValidEyes(inputTiles: Tile[]): boolean {
    if (inputTiles.length !== Meld.NUMBER_OF_TILES_FOR_EYES) {
      return false;
    }
    return inputTiles[0].isIdentical(inputTiles[1]);
  }

  private isValidKong(inputTiles: Tile[]): boolean {
    const validTilesLength = inputTiles.length === Meld.NUMBER_OF_TILES_FOR_KONG;
    if (validTilesLength) {
      return this.allTilesAreSame(inputTiles);
    } else {
      return false;
    }
  }

  private isValidPong(inputTiles: Tile[]): boolean {
    const validTilesLength = inputTiles.length === Meld.NUMBER_OF_TILES_FOR_PONG;
    if (validTilesLength) {
      return this.allTilesAreSame(inputTiles);
    } else {
      return false;
    }
  }

  private isValidChow(inputTiles: Tile[]): boolean {
    const validTilesLength = inputTiles.length === Meld.NUMBER_OF_TILES_FOR_CHOW;
    const allTilesAreNotInHonorType = inputTiles.every((tile) => tile.getSuit() !== 'honor');
    if (validTilesLength && allTilesAreNotInHonorType) {
      const sortedTiles = inputTiles.sort((tile1, tile2) => tile1.getValue() - tile2.getValue());
      const firstAndSecondTilesAreConsecutive = sortedTiles[0].getValue() === sortedTiles[1].getValue() - 1;
      const secondAndThirdTilesAreConsecutive = sortedTiles[1].getValue() === sortedTiles[2].getValue() - 1;
      return firstAndSecondTilesAreConsecutive && secondAndThirdTilesAreConsecutive;
    } else {
      return false;
    }
  }

  private allTilesAreSame(inputTiles: Tile[]): boolean {
    for (let i = 0; i < inputTiles.length - 1; i++) {
      if (!inputTiles[i].isIdentical(inputTiles[i + 1])) {
        return false;
      }
    }
    return true;
  }

  private allTilesAreInSameSuit(inputTiles: Tile[]): boolean {
    for (let i = 0; i < inputTiles.length - 1; i++) {
      if (inputTiles[i].getSuit() !== inputTiles[i + 1].getSuit()) {
        return false;
      }
    }
    return true;
  }
}
