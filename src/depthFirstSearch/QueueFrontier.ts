import NodeForSearching from './NodeForSearching';

/**
 * This class is the queue frontier that follows the "First In, First Out" principle, and is used for performing Depth First Search.
 */
class QueueFrontier {
  /**
   * The frontier.
   */
  #frontier: NodeForSearching[];

  /**
   * Construct the queue frontier.
   */
  constructor() {
    this.#frontier = [];
  }

  /**
   * Insert the new node to the end of the frontier.
   * @param node the new node to be inserted to the frontier.
   */
  add(node: NodeForSearching) {
    this.#frontier.push(node);
  }

  /**
   * Check if the frontier contains node that has identical Melds form with the input node.
   * @param inputNode the node to be compared.
   * @returns {boolean} true if the frontier contains node that has identical Melds form with the input node.
   */
  contain(inputNode: NodeForSearching): boolean {
    for (const nodeInFrontier of this.#frontier) {
      if (nodeInFrontier.isIdenticalMeldsFormed(inputNode)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if the frontier is empty.
   * @returns {boolean} true if the frontier is empty.
   */
  empty(): boolean {
    return this.#frontier.length === 0;
  }

  /**
   * Remove and return the first node of the frontier.
   * @returns {NodeForSearching} the first node of the frontier.
   */
  remove(): NodeForSearching {
    if (this.empty()) {
      throw new Error('Frontier has been empty already.');
    }
    const node: NodeForSearching = this.#frontier[0];
    this.#frontier.shift();
    return node;
  }
}

export default QueueFrontier;
