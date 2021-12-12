import WinningHand from "../WinningHand";

export default function isMixedOneSuit(inputWinningHand: WinningHand) {
    let containHonor = false;
    const melds = inputWinningHand.getMelds();
    for (let i = 0; i < melds.length - 1; i++){
        if (melds[i].getSuitType() === "honor" || melds[i + 1].getSuitType() === "honor"){
            containHonor = true;
            continue;
        }
        if (melds[i].getSuitType() !== melds[i].getSuitType()){
            return false;
        }
    }
    return containHonor;
}