import Meld from '../meld/Meld';
import MeldOccurrencesMap from '../meld/MeldOccurrencesMap';
import { MeldType } from '../meld/MeldType';
import Tile from '../tile/Tile';

/**
 * This class is the Node used for performing the Depth First Search.
 */
class NodeForSearching {
  /**
   * The array of unorganized Tiles.
   */
  #unorganizedTiles: Tile[];

  /**
   * The parent node.
   */
  #parent: NodeForSearching | null;

  /**
   * The last action that was taken to form meld and produces this node from its parent node.
   */
  #lastAction: MeldType | null;

  /**
   * The array of Melds that have been formed.
   */
  #meldsFormed: Meld[];

  /**
   * Construct the node.
   * @param unorganizedTiles The array of unorganized Tiles.
   * @param parent The parent node.
   * @param lastAction The last action that was taken to form meld and produces this node from its parent node.
   * @param meldsFormed The array of Melds that have been formed.
   */
  constructor(
    unorganizedTiles: Tile[],
    parent: NodeForSearching | null,
    lastAction: MeldType | null,
    meldsFormed: Meld[],
  ) {
    this.#unorganizedTiles = unorganizedTiles;
    this.#parent = parent;
    this.#lastAction = lastAction;

    if (meldsFormed !== null) {
      this.#meldsFormed = meldsFormed;
    } else {
      this.#meldsFormed = [];
    }
  }

  /**
   * Compare if the Melds formed of two nodes are the same.
   * @param inputNode the node to be compared.
   * @returns {boolean} true if the Melds formed of the two nodes are the same.
   */
  public isIdenticalMeldsFormed(inputNode: NodeForSearching): boolean {
    const meldsOfThisNode = this.mapOccurrencesOfTilesInMeld(this.#meldsFormed);
    const meldsOfComparedNode = this.mapOccurrencesOfTilesInMeld(inputNode.getMeldsFormed());

    for (const meld in meldsOfThisNode) {
      // Requirement of TSLint: for (... in ...) statements must be filtered with an if statement.
      if (meldsOfThisNode.hasOwnProperty(meld)) {
        const meldOccurrencesIsDifferent = meldsOfComparedNode[meld] !== meldsOfThisNode[meld];
        if (meldOccurrencesIsDifferent) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  /**
   * Access the unorganized Tiles.
   * @returns {Tile []} unorganized Tiles.
   */
  public getUnorganizedTiles(): Tile[] {
    return this.#unorganizedTiles.slice();
  }

  /**
   * Access the parent node.
   * @returns {NodeForSearching | null} the parent node.
   */
  public getParent(): NodeForSearching | null {
    return this.#parent;
  }

  /**
   * Access the last action.
   * @returns {MeldType | null} last action that was taken to form meld and produces this node from its parent node. Null if the node has no parent node.
   */
  public getLastAction(): MeldType | null {
    return this.#lastAction;
  }

  /**
   * Access the array of formed Melds.
   * @returns {Meld []} the array of Melds that have been formed.
   */
  public getMeldsFormed(): Meld[] {
    return this.#meldsFormed.slice();
  }

  /**
   * Count the occurrences of Tiles in a Meld.
   * @param inputMeld
   * @returns {MeldOccurrencesMap} a dictionary that maps the occurrences of Tiles in the Meld.
   */
  private mapOccurrencesOfTilesInMeld(inputMeld: Meld[]): MeldOccurrencesMap {
    const map: MeldOccurrencesMap = {};
    for (const meld of inputMeld) {
      const meldString: string = meld.toString();
      if (map[meldString]) {
        map[meldString]++;
      } else {
        map[meldString] = 1;
      }
    }
    return map;
  }
}

export default NodeForSearching;
