import Tile from './Tile';

export default class TileSet {
  private tiles: Tile[];

  constructor() {
    this.tiles = [];

    const suits = Object.keys(Tile.ALL_SUIT_TYPES);
    for (const suit of suits) {
      for (let tileValue = 1; tileValue <= Tile.ALL_SUIT_TYPES[suit]['maxValue']; tileValue++) {
        for (let i = 0; i < 4; i++) {
          this.tiles.push(new Tile({ suit, value: tileValue }));
        }
      }
    }
    this.shuffleTiles();
  }

  public getAllTiles() {
    return this.tiles.slice();
  }

  public getOneTile(): Tile {
    if (this.hasNoMoreTiles()) {
      throw new Error('There are no more Tiles.');
    } else {
      const result = this.tiles.shift();
      if (result === undefined) {
        throw new Error('There are no more Tiles.');
      } else {
        return result;
      }
    }
  }

  public hasNoMoreTiles() {
    return this.tiles.length === 0;
  }

  public reshuffleTiles() {
    const suits = Object.keys(Tile.ALL_SUIT_TYPES);
    for (const suit of suits) {
      for (let tileValue = 1; tileValue <= Tile.ALL_SUIT_TYPES[suit]['maxValue']; tileValue++) {
        for (let i = 0; i < 4; i++) {
          this.tiles.push(new Tile({ suit, value: tileValue }));
        }
      }
    }
    this.shuffleTiles();
  }

  private shuffleTiles(numberOfShuffles?: number) {
    for (let shuffleRound = 0; shuffleRound < (numberOfShuffles || 10); shuffleRound++) {
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = this.tiles[i];
        this.tiles[i] = this.tiles[randomIndex];
        this.tiles[randomIndex] = temp;
      }
    }
  }
}
