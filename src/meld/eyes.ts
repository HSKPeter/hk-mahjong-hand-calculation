import Meld from "./Meld";
import { MeldType } from "./MeldType";
import Tile from "../Tile";

export default function eyes(inputTiles: Tile[]): Meld | null {
    const copyOfInputTiles = inputTiles.slice();
    if (copyOfInputTiles.length !== Meld.NUMBER_OF_TILES_FOR_EYES) {
        return null;
    }

    if (copyOfInputTiles[0].isIdentical(copyOfInputTiles[1])) {
        return new Meld(copyOfInputTiles);
    }

    return null;
}

export function hasOnePairOfEyes(inputMelds: Meld[]): boolean{
    let numberOfPairOfEyes = 0;
    for (const meld of inputMelds){
        if (meld.getMeldType() === MeldType.EYES){
            numberOfPairOfEyes ++ 
        }
    }
    return numberOfPairOfEyes === 1;
}