import Tile from '../tile/Tile';
import Hand from '../hand/Hand';
import Meld from '../meld/Meld';
import { FaanCalculationConfig } from '../calculateFaan/FaanCalculationConfig';
import FaanCalculator from '../calculateFaan/FaanCalculator';
import WinningHand from '../hand/WinningHand';

export default class Player {
  /**
   * Name of the player.
   */
  #name: string;

  /**
   * Balance of the player.
   */
  #balance: number;

  /**
   * Tiles held by the player.
   */
  #tiles: Tile[];

  /**
   * Melds that have been formed by the player.
   */
  #melds: Meld[];

  constructor(nameInput: string) {
    this.#name = nameInput;
    this.#balance = 0;
    this.#tiles = [];
    this.#melds = [];
  }

  /**
   * Access the player's name.
   * @returns {string}
   */
  public getName() {
    return this.#name;
  }

  /**
   * Mutate the player's name.
   * @param nameInput 
   */
  public setName(nameInput: string) {
    this.#name = nameInput;
  }

  /**
   * Access the player's balance.
   * @returns {number}
   */
  public getBalance() {
    return this.#balance;
  }

  /**
   * Get the WinningHand with the possible largest Faan value when the player claims winning.
   * @param config configuration for calculating the Faan value.
   * @returns {WinningHand}
   */
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

  /**
   * Pay a particular amount of money to another player.
   * @param recipient 
   * @param amount 
   */
  public pay(recipient: Player, amount: number) {
    this.#balance -= amount;
    recipient.receive(amount);
  }

  /**
   * Receive a particular amount of money from another player.
   * @param amount 
   */
  public receive(amount: number) {
    this.#balance += amount;
  }

  /**
   * Draw Tile.
   * @param tile 
   */
  public drawTile(tile: Tile) {
    this.#tiles.push(tile);
  }

  /**
   * Discard Tile.
   * @param tile 
   * @returns {Tile}
   */
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
