import Meld from "./meld/Meld";
import { MeldType } from "./meld/MeldType";
import Tile from "./Tile";
import tilesOccurrencesMap from "./tilesOccurrencesMap";
import WinningHand from "./WinningHand";

export function isThirteenOrphansAsTilesArray(inputTiles: Tile[]): boolean{
    const copyOfInputTiles = inputTiles.slice();

    if (copyOfInputTiles.length !== Meld.NUMBER_OF_TILES_FOR_THIRTEEN_ORPHANS){
        return false;
    }

    const map = tilesOccurrencesMap(copyOfInputTiles);
    if(map["honor"] === undefined || map["character"] === undefined || map["dot"] === undefined || map["bamboo"] === undefined){
        return false;
    }
    for (const suit in map){
        if (suit === "honor"){
            for (let value = Tile.ALL_SUIT_TYPES["honor"]["minValue"]; value <= Tile.ALL_SUIT_TYPES["honor"]["maxValue"]; value ++){
                if (map[suit][value.toString()] < 1) return false;    
            }
        } else {
            if (map[suit]["1"] === undefined || map[suit]["1"] < 1){
                return false;
            }
            if (map[suit]["9"] === undefined || map[suit]["9"] < 1) {
                return false;
            }
        }
    }

    return true;
}

export function convertThirteenOrphansToMeld(inputTiles: Tile[]): Meld{        
    const copyOfInputTiles = inputTiles.slice();

    if (!isThirteenOrphansAsTilesArray(copyOfInputTiles)){
        throw new Error ("Input Tiles array is not a valid ThirteenOrphan.");
    }    

    const sortedTiles = sortTilesInThirteenOrphans(copyOfInputTiles);
    return new Meld(sortedTiles);
}

/**
 * sorting function and present in standardized form
 * E.g.  🀀🀁🀂🀃🀄🀅🀆🀇🀏🀙🀡🀐🀘🀄 --> 🀀🀁🀂🀃🀄🀄🀅🀆🀇🀏🀙🀡🀐🀘
 * @param inputTiles 
 * @returns 
 */
export function sortTilesInThirteenOrphans(inputTiles: Tile[]): Tile[]{
    const copyOfInputTiles = inputTiles.slice();

    const tiles = [
        new Tile({suit: "honor", value: 1}),
        new Tile({suit: "honor", value: 2}),
        new Tile({suit: "honor", value: 3}),
        new Tile({suit: "honor", value: 4}),
        new Tile({suit: "honor", value: 5}),
        new Tile({suit: "honor", value: 6}),
        new Tile({suit: "honor", value: 7}),
        new Tile({suit: "character", value: 1}),
        new Tile({suit: "character", value: 9}),
        new Tile({suit: "dot", value: 1}),
        new Tile({suit: "dot", value: 9}),
        new Tile({suit: "bamboo", value: 1}),
        new Tile({suit: "bamboo", value: 9})
    ];

    const map = {};
    for (const tile of copyOfInputTiles){        
        if (map[tile.toString()] !== undefined){
            map[tile.toString()] ++;
            if (map[tile.toString()] === Meld.NUMBER_OF_TILES_FOR_EYES){
                const tileToFormEyes = tile;
                for (let i = 0; i < tiles.length; i ++){
                    if (tiles[i].isIdentical(tileToFormEyes)){
                        tiles.splice(i, 0, tileToFormEyes);
                        return tiles;
                    }
                }
            }
        } else {
            map[tile.toString()] = 1;
        }
    }

    throw new Error("Error in sorting Tiles in ThirteenOrphans.")
}

export function isThirteenOrphansAsMeld(inputMeld: Meld): boolean{    
    return inputMeld.getMeldType() === MeldType.THIRTEEN_ORPHANS;
}

export function isThirteenOrphansAsWinningHand(inputWinningHand: WinningHand): boolean{    
    return inputWinningHand.getMelds().length === WinningHand.NUMBER_OF_MELDS_NEEDED_FOR_THIRTEEN_ORPHANS;
}

