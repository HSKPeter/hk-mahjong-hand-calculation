import Meld from '../meld/Meld';
import { MeldType } from '../meld/MeldType';
import Tile from '../tile/Tile';

class NodeForSearching {
  #unprocessedTiles: Tile[];
  #parent: NodeForSearching | null;
  #lastAction: MeldType | null;
  #meldsFormed: Meld[];

  constructor(
    unorganizedTiles: Tile[],
    parent: NodeForSearching | null,
    lastAction: MeldType | null,
    meldsFormed: Meld[],
  ) {
    this.#unprocessedTiles = unorganizedTiles;
    this.#parent = parent;
    this.#lastAction = lastAction;

    if (meldsFormed !== null) {
      this.#meldsFormed = meldsFormed;
    } else {
      this.#meldsFormed = [];
    }
  }

  public isIdenticalMeldsFormed(node: NodeForSearching): boolean {
    const meldsOfThisNode = this.mapOccurrencesOfTilesInMeld(this.#meldsFormed);
    const meldsOfComparedNode = this.mapOccurrencesOfTilesInMeld(node.getMeldsFormed());

    for (const meld in meldsOfThisNode){
      const meldNotFound = meldsOfComparedNode[meld] === undefined;
      const meldOccurrencesIsDifferent = meldsOfComparedNode[meld] !== meldsOfThisNode[meld];
      if ( meldNotFound || meldOccurrencesIsDifferent){
        return false;
      }
    }

    return true;
  }

  public getUnorganizedTiles() {
    return this.#unprocessedTiles.slice();
  }

  public getParent() {
    return this.#parent;
  }

  public getLastAction() {
    return this.#lastAction;
  }

  public getMeldsFormed(): Meld[] {
    return this.#meldsFormed.slice();
  }

  private mapOccurrencesOfTilesInMeld(inputMeld: Meld[]) {
    const map: { [key: string]: number } = {};
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
