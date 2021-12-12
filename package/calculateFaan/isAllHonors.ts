import WinningHand from "../WinningHand";

export default function isAllHonors(inputWinningHand: WinningHand) {
    const melds = inputWinningHand.getMelds();
    for (let i = 0; i < melds.length; i++){
        if (melds[i].getSuitType() !== "honor"){
            return false;
        }
    }
    return true;
}