import WinningHand from "../WinningHand";

export default function isAllOneSuit(inputWinningHand: WinningHand) {
    const melds = inputWinningHand.getMelds();
    for (let i = 0; i < melds.length - 1; i++){
        if (melds[i].getSuitType() !== melds[i + 1].getSuitType()){
            return false;
        }
    }
    return true;
}