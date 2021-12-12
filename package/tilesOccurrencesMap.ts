import occurrencesMap from "./occurrencesMap";
import Tile from "./Tile";

export default function tilesOccurrencesMap(inputTiles: Tile[]): occurrencesMap{
    const copyOfInputTiles = inputTiles.slice();

    const map: occurrencesMap = {};

    for (const tile of copyOfInputTiles){
        const tileSuit = tile.getSuit();
        const tileValue = tile.getValue();

        if(map[tileSuit] === undefined){
            map[tileSuit] = {};
        }

        if (map[tileSuit][tileValue] === undefined){
            map[tileSuit][tileValue] = 1;
        } else {
            map[tileSuit][tileValue]++ ;
            if (map[tileSuit][tileValue] > Tile.MAX_OCCURRENCE_IN_A_MAHJONG_SET){
                throw new Error(`Invalid input of tiles.  Each tile should only have ${Tile.MAX_OCCURRENCE_IN_A_MAHJONG_SET} occurrences at maximum in a mahjong set.`);
            }
        }
    }

    return map;
}

