import Tile from '../tile/Tile';
import Hand from '../hand/Hand';
import Meld from '../meld/Meld';
import { FaanCalculationConfig } from '../calculateFaan/FaanCalculationConfig';
import FaanCalculator from '../calculateFaan/FaanCalculator';
import WinningHand from '../hand/WinningHand';

export default class Player {
  #name: string;
  #balance: number;
  #tiles: Tile[];
  #melds: Meld[];

  constructor(nameInput: string) {
    this.#name = nameInput;
    this.#balance = 0;
    this.#tiles = [];
    this.#melds = [];
  }

  public getName() {
    return this.#name;
  }

  public setName(nameInput: string) {
    this.#name = nameInput;
  }

  public getBalance() {
    return this.#balance;
  }

  public claimWinning(config?: FaanCalculationConfig): WinningHand {
    const hand = new Hand({ melds: this.#melds.slice(), tiles: this.#tiles.slice() });
    if (hand.isWinningHand()) {
      const winningPermutations = hand.findAllWinningPermutations();
      let result: WinningHand = winningPermutations[0];
      if (winningPermutations.length > 1) {
        for (let i = 1; i < winningPermutations.length; i++) {
          if (FaanCalculator.calculate(winningPermutations[i], config) > FaanCalculator.calculate(result, config)) {
            result = winningPermutations[i];
          }
        }
      }
      return result;
    } else {
      throw new Error(`Player ${this.#name} falsely declared a win.`);
    }
  }

  public pay(recipient: Player, amount: number) {
    this.#balance -= amount;
    recipient.receive(amount);
  }

  public receive(amount: number) {
    this.#balance += amount;
  }

  public drawTile(tile: Tile) {
    this.#tiles.push(tile);
  }

  public discardTile(tile: Tile): Tile {
    for (let i = 0; i < this.#tiles.length; i++) {
      if (this.#tiles[i].isIdentical(tile)) {
        this.#tiles.splice(i, 1);
        return tile;
      }
    }
    throw new Error('Invalid tile input.');
  }
}
