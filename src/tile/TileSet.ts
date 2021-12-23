import Tile from './Tile';

/**
 * This class simulates the Tile set for a Mahjong Game. 
 */
export default class TileSet {
  /**
   * Mahjong Tiles.
   */
  #tiles: Tile[];

  /**
   * Construct a TileSet.
   */
  constructor() {
    this.#tiles = [];

    const suits = Object.keys(Tile.ALL_SUIT_TYPES);
    for (const suit of suits) {
      for (let tileValue = 1; tileValue <= Tile.ALL_SUIT_TYPES[suit]['maxValue']; tileValue++) {
        for (let i = 0; i < 4; i++) {
          this.#tiles.push(new Tile({ suit, value: tileValue }));
        }
      }
    }
    this.shuffleTiles();
  }

  /**
   * Access all Tiles of the TileSet.
   * @returns all Tiles of the TileSet.
   */
  public getAllTiles() {
    return this.#tiles.slice();
  }

  /**
   * Draw one Tile from the TileSet.
   * @returns a Tile from the TileSet.
   */
  public getOneTile(): Tile {
    if (this.hasNoMoreTiles()) {
      throw new Error('There are no more Tiles.');
    } else {
      const result = this.#tiles.shift();
      if (result === undefined) {
        throw new Error('There are no more Tiles.');
      } else {
        return result;
      }
    }
  }

  /**
   * Determine if all Tiles have been drawn.
   * @returns true if there are no more Tiles.
   */
  public hasNoMoreTiles() {
    return this.#tiles.length === 0;
  }

  /**
   * Shuffle the tiles.
   * @param numberOfShuffles number of shuffles.
   */
  private shuffleTiles(numberOfShuffles?: number) {
    for (let shuffleRound = 0; shuffleRound < (numberOfShuffles || 10); shuffleRound++) {
      for (let i = this.#tiles.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = this.#tiles[i];
        this.#tiles[i] = this.#tiles[randomIndex];
        this.#tiles[randomIndex] = temp;
      }
    }
  }
}
