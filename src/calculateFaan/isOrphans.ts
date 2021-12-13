import { MeldType } from "../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isOrphans(inputWinningHand: WinningHand) {
    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        if (meld.getMeldType() === MeldType.CHOW) return false;
        if (meld.getTiles()[0].getSuit() === "honor") return false;
        const hasValueOfOneOrNine = meld.getTiles()[0].getValue() === 1 || meld.getTiles()[0].getValue() === 9;        
        if (!hasValueOfOneOrNine) return false;
    }
    return true;
}