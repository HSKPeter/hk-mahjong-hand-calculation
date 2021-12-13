import { MeldType } from "../../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isCommonHand(inputWinningHand: WinningHand) {
    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        if (meld.getMeldType() === MeldType.EYES) continue;
        if (meld.getMeldType() !== MeldType.CHOW) {
            return false;
        }
    }
    return true;
}