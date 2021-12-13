import WinningHand from "../WinningHand";
import isAllOneSuit from "./isAllOneSuit";

export default function isNineGates(inputWinningHand: WinningHand) {
    
    // const map = {
    //     "1": 3,
    //     "2": 1,
    //     "3": 1,
    //     "4": 1,
    //     "5": 1,
    //     "6": 1,
    //     "7": 1,
    //     "8": 1,
    //     "9": 3
    // }
    
    // 111-2345678-999  
    const map = [3,1,1,1,1,1,1,1,3];

    // Pre-requisite of a NineGates is consisting only one type of suit.
    if (!isAllOneSuit(inputWinningHand)){
        return false;
    }

    const tiles = inputWinningHand.convertToTiles();
    
    for (const tile of tiles){
        if (tile.getSuit() === "honor") return false;

        const tileValue = tile.getValue();
        if (map[tileValue - 1] === 0) continue;
        
        map[tileValue - 1] -- ;
    }

    for (const value of map){
        if (value !== 0) return false;
    }

    return true;
}