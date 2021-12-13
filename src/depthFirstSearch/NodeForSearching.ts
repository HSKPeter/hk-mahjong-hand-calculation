import Meld from "../meld/Meld";
import { MeldType } from "../meld/MeldType";
import Tile from "../Tile";

class NodeForSearching {
    private unprocessedTiles: Tile[];
    private parent: NodeForSearching | null;
    private lastAction: MeldType | null;
    private meldsFormed: Meld[];

    constructor(
        unorganizedTiles: Tile[],
        parent: NodeForSearching | null,
        lastAction: MeldType | null,
        meldsFormed: Meld[],
    ) {
        this.unprocessedTiles = unorganizedTiles;
        this.parent = parent;
        this.lastAction = lastAction;

        if (meldsFormed !== null) {
            this.meldsFormed = meldsFormed;
        } else {
            this.meldsFormed = [];
        }
    }

    public isIdentical(node: NodeForSearching): boolean {
        return false;
    }

    public getUnorganizedTiles(){
        return this.unprocessedTiles.slice();
    }

    public getParent(){
        return this.parent;
    }

    public getLastAction(){
        return this.lastAction;
    }

    public getMeldsFormed() : Meld[]{
        return this.meldsFormed.slice();
    }

}

export default NodeForSearching;