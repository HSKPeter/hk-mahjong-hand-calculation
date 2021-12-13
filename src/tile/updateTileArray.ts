import Meld from "../meld/Meld";
import Tile from "./Tile";

export default function updateTileArray(inputTiles: Tile[], inputMeld: Meld): Tile[]{
    const copyOfInputTiles = inputTiles.slice();
    const tilesInMeld = inputMeld.getTiles();
    
    for (const tileInMeld of tilesInMeld){
        for (let i = 0; i < copyOfInputTiles.length; i ++){
            if (copyOfInputTiles[i].isIdentical(tileInMeld)){
                copyOfInputTiles.splice(i, 1);
                break;
            }
        }
    }
    return copyOfInputTiles;
}