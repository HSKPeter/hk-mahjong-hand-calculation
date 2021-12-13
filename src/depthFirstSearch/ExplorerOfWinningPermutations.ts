import Hand from "../hand/Hand"
import { MeldType } from "../meld/MeldType";
import NodeForSearching from "./NodeForSearching";
import QueueFrontier from "./QueueFrontier";
import WinningHand from "../hand/WinningHand";
import updateTileArray from "../tile/updateTileArray";
import chow from "../meld/chow";
import kong from "../meld/kong";
import pong from "../meld/pong";
import eyes, { hasOnePairOfEyes } from "../meld/eyes";
import { convertThirteenOrphansToMeld, isThirteenOrphansAsTilesArray } from "../hand/handType/isThirteenOrphans";

class ExplorerOfWinningPermutations {
    private permutationsExplored: WinningHand[];
    private handInput: Hand;

    constructor(input: Hand) {
        this.handInput = input;
        this.permutationsExplored = [];
    };

    public getWinningPermutations(): WinningHand[] {
        this.performDepthFirstSearch();
        return this.permutationsExplored;
    }

    private performDepthFirstSearch() {        
        const initNode = new NodeForSearching(this.handInput.getUnorganizedTiles(), null, null, this.handInput.getMeldsFormed());
        const frontier = new QueueFrontier();
        frontier.add(initNode);

        while (true) {            
            if (frontier.empty()) {
                break;
            }

            // 從 frontier 裡面抽取第一個 NodeForExploration 係下面部分再做處理, 同時係 frontier 裡面 remove 呢個 NodeForExploration
            const node = frontier.remove();

            // calculate 副牌坎嘅數目 and 副牌眼嘅數目 from the processed part
            const unorganizedTiles = node.getUnorganizedTiles();
    
            if (isThirteenOrphansAsTilesArray(unorganizedTiles)){
                const meld = convertThirteenOrphansToMeld(unorganizedTiles);
                this.permutationsExplored.push(new WinningHand([meld]));
                break;
            }

            const meldsFormed = node.getMeldsFormed();
            if (meldsFormed.length === 1 && meldsFormed[0].getMeldType() === MeldType.THIRTEEN_ORPHANS){
                this.permutationsExplored.push(new WinningHand(meldsFormed));
                break;
            }


            const isAbleToFormStandardWinningHand =
                unorganizedTiles.length === 0
                && meldsFormed.length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_STANDARD_FORM
                && hasOnePairOfEyes(meldsFormed);

            if (isAbleToFormStandardWinningHand) {
                this.permutationsExplored.push(new WinningHand(meldsFormed));
            }

            const eyesFormed = eyes(unorganizedTiles);            
            const isAbleToFormEyes = eyesFormed !== null;
            if (isAbleToFormEyes) {
                const meldType = MeldType.EYES;
                const unprocessedTilesAfterFormingEyes = updateTileArray(unorganizedTiles.slice(), eyesFormed);
                const melds = node.getMeldsFormed();
                melds.push(eyesFormed);
                const childNode = new NodeForSearching(unprocessedTilesAfterFormingEyes, node, meldType, melds);
                if (!frontier.contain(childNode)) {
                    frontier.add(childNode);
                }
            }

            const kongFormed = kong(unorganizedTiles);            
            const isAbleToFormKong = kongFormed !== null;
            if (isAbleToFormKong) {
                const meldType = MeldType.KONG;
                const unprocessedTilesAfterFormingKong = updateTileArray(unorganizedTiles.slice(), kongFormed);
                const melds = node.getMeldsFormed();
                melds.push(kongFormed);
                const childNode = new NodeForSearching(unprocessedTilesAfterFormingKong, node, meldType, melds);
                if (!frontier.contain(childNode)) {
                    frontier.add(childNode);
                }
            }

            const pongFormed = pong(unorganizedTiles);
            const isAbleToFormPong = pongFormed !== null;
            if (isAbleToFormPong) {
                const meldType = MeldType.PONG;
                const unprocessedTilesAfterFormingPong = updateTileArray(unorganizedTiles.slice(), pongFormed);
                const melds = node.getMeldsFormed();
                melds.push(pongFormed);
                const childNode = new NodeForSearching(unprocessedTilesAfterFormingPong, node, meldType, melds);
                if (!frontier.contain(childNode)) {
                    frontier.add(childNode);
                }
            }

            const chowFormed = chow(unorganizedTiles);
            const isAbleToFormChow = chowFormed !== null;
            if (isAbleToFormChow) {
                const meldType = MeldType.CHOW;
                const unprocessedTilesAfterFormingChow = updateTileArray(unorganizedTiles.slice(), chowFormed);
                const melds = node.getMeldsFormed();
                melds.push(chowFormed);
                const childNode = new NodeForSearching(unprocessedTilesAfterFormingChow, node, meldType, melds);
                if (!frontier.contain(childNode)) {
                    frontier.add(childNode);
                }
            }
        }

    }

}

export default ExplorerOfWinningPermutations;