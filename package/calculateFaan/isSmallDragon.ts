import { MeldType } from "../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isSmallDragon(inputWinningHand: WinningHand) {
    // red dragon or green dragon or white dragon
    let pongsOrKongsOfDragons = 0;
    let hasEyesOfDragons = false;

    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        const isDragon = meld.getTiles()[0].getSuit() === "honor" && meld.getTiles()[0].getValue() >= 5;

        if (meld.getMeldType() === MeldType.EYES){
            if (isDragon){
                hasEyesOfDragons = true;
            }
            continue;
        } 

        if (meld.getMeldType() === MeldType.PONG || meld.getMeldType() === MeldType.KONG){
            if (isDragon) {
                pongsOrKongsOfDragons ++ ;
            }
        }            
    }
    return pongsOrKongsOfDragons === 2 && hasEyesOfDragons;
}