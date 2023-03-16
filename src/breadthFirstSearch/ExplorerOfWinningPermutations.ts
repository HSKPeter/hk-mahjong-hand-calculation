import Hand from '../hand/Hand';
import { MeldType } from '../meld/MeldType';
import NodeForSearching from './NodeForSearching';
import QueueFrontier from './QueueFrontier';
import WinningHand from '../hand/WinningHand';
import updateTileArray from '../tile/updateTileArray';
import chows from '../meld/chows';
import kongs from '../meld/kongs';
import pongs from '../meld/pongs';
import eyes, { hasOnePairOfEyes } from '../meld/eyes';
import { convertThirteenOrphansToMeld, isThirteenOrphansAsTilesArray } from '../hand/handType/isThirteenOrphans';

/**
 * This class explores all possible winning permutation of a Hand.
 */
class ExplorerOfWinningPermutations {
  /**
   * The WinningHand that has been already explored.
   */
  #permutationsExplored: WinningHand[];

  /**
   * The Mahjong Hand of which the winning permutation has to be explored.
   */
  #handInput: Hand;

  /**
   * Construct an instance of the class.
   * @param input the Mahjong Hand of which the winning permutation has to be explored.
   */
  constructor(input: Hand) {
    this.#handInput = input;
    this.#permutationsExplored = [];
  }

  /**
   * Access the Winning permutations of the Mahjong Hand.
   * @returns {WinningHand []} the Winning permutations of the Mahjong Hand.
   */
  public getWinningPermutations(): WinningHand[] {
    this.performBreadthFirstSearch();
    return this.#permutationsExplored;
  }

  /**
   * Perform the Breadth First search.
   */
  private performBreadthFirstSearch() {
    const initNode = new NodeForSearching(
      this.#handInput.getUnorganizedTiles(),
      null,
      null,
      this.#handInput.getMeldsFormed(),
    );
    const frontier = new QueueFrontier();
    frontier.add(initNode);

    while (true) {
      if (frontier.empty()) {
        break;
      }

      // Retrieve the first node from the frontier for further processing in the latter part.  Meanwhile, the retrieval action would remove the first node from the frontier.
      const node = frontier.remove();

      const unorganizedTiles = node.getUnorganizedTiles();

      // Identify if the Hand is a ThirteenOrphans.
      if (isThirteenOrphansAsTilesArray(unorganizedTiles)) {
        const meld = convertThirteenOrphansToMeld(unorganizedTiles);
        this.#permutationsExplored.push(new WinningHand([meld]));
        break;
      }

      const meldsFormed = node.getMeldsFormed();
      if (meldsFormed.length === 1 && meldsFormed[0].getMeldType() === MeldType.THIRTEEN_ORPHANS) {
        this.#permutationsExplored.push(new WinningHand(meldsFormed));
        break;
      }

      // Evaluate if the Hand is able to form a standard WinningHand
      const isAbleToFormStandardWinningHand =
        unorganizedTiles.length === 0 &&
        meldsFormed.length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM &&
        hasOnePairOfEyes(meldsFormed);

      if (isAbleToFormStandardWinningHand) {
        this.#permutationsExplored.push(new WinningHand(meldsFormed));
      }

      if (meldsFormed.length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM - 1) {
        const eyesFormed = eyes(unorganizedTiles);
        const isAbleToFormEyes = eyesFormed !== null;
        if (isAbleToFormEyes) {
          const meldType = MeldType.EYES;
          const unorganizedTilesAfterFormingEyes = updateTileArray(unorganizedTiles, eyesFormed);
          const melds = node.getMeldsFormed();
          melds.push(eyesFormed);
          const childNode = new NodeForSearching(unorganizedTilesAfterFormingEyes, node, meldType, melds);
          if (!frontier.contain(childNode)) {
            frontier.add(childNode);
          }
        }
      }

      const kongsFormed = kongs(unorganizedTiles);
      for (const kongFormed of kongsFormed) {
        const meldType = MeldType.KONG;
        const unorganizedTilesAfterFormingKong = updateTileArray(unorganizedTiles, kongFormed);
        const melds = node.getMeldsFormed();
        melds.push(kongFormed);
        const childNode = new NodeForSearching(unorganizedTilesAfterFormingKong, node, meldType, melds);
        if (!frontier.contain(childNode)) {
          frontier.add(childNode);
        }
      }

      const pongsFormed = pongs(unorganizedTiles);
      for (const pongFormed of pongsFormed) {
        const meldType = MeldType.PONG;
        const unorganizedTilesAfterFormingPong = updateTileArray(unorganizedTiles, pongFormed);
        const melds = node.getMeldsFormed();
        melds.push(pongFormed);
        const childNode = new NodeForSearching(unorganizedTilesAfterFormingPong, node, meldType, melds);
        if (!frontier.contain(childNode)) {
          frontier.add(childNode);
        }
      }

      const chowsFormed = chows(unorganizedTiles);
      for (const chowFormed of chowsFormed) {
        const meldType = MeldType.CHOW;
        const unorganizedTilesAfterFormingChow = updateTileArray(unorganizedTiles, chowFormed);
        const melds = node.getMeldsFormed();
        melds.push(chowFormed);
        const childNode = new NodeForSearching(unorganizedTilesAfterFormingChow, node, meldType, melds);
        if (!frontier.contain(childNode)) {
          frontier.add(childNode);
        }
      }
    }
  }
}

export default ExplorerOfWinningPermutations;
