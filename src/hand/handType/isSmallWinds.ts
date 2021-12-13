import { MeldType } from "../../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isSmallWinds(inputWinningHand: WinningHand) {
    // red dragon or green dragon or white dragon
    let pongsOrKongsOfWinds = 0;
    let hasEyesOfWinds = false;

    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        const isWind = meld.getTiles()[0].getSuit() === "honor" && meld.getTiles()[0].getValue() <= 4;
        
        if (meld.getMeldType() === MeldType.EYES){
            if (isWind) hasEyesOfWinds = true;
            continue;
        } 

        if (meld.getMeldType() === MeldType.PONG || meld.getMeldType() === MeldType.KONG){
            if (isWind) pongsOrKongsOfWinds ++ ;  
        }            
    }
    return pongsOrKongsOfWinds === 3 && hasEyesOfWinds;
}