import { MeldType } from "../../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isGreatDragon(inputWinningHand: WinningHand) {
    // red dragon or green dragon or white dragon
    let pongsOrKongsOfDragons = 0;

    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        if (meld.getMeldType() === MeldType.EYES) continue;

        if (meld.getMeldType() === MeldType.PONG || meld.getMeldType() === MeldType.KONG){
            if (meld.getTiles()[0].getSuit() === "honor" && meld.getTiles()[0].getValue() >= 5) {
                pongsOrKongsOfDragons ++ ;
            }
        }            
    }
    return pongsOrKongsOfDragons === 3;
}