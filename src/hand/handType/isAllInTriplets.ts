import { MeldType } from "../../meld/MeldType";
import WinningHand from "../WinningHand";

export default function isAllInTriplets(inputWinningHand: WinningHand) {
    const melds = inputWinningHand.getMelds();
    for (const meld of melds) {
        if (meld.getMeldType() === MeldType.EYES) continue;
        
        const isKong = meld.getMeldType() === MeldType.KONG;
        const isPong = meld.getMeldType() === MeldType.PONG;
        const isNeitherKongNorPong = !(isKong || isPong)
        if (isNeitherKongNorPong) {
            return false;
        }
    }
    return true;
}