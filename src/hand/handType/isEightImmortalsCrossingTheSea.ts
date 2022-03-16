import FaanCalculationConfig from '../../calculateFaan/FaanCalculationConfig';
import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a an EightImmortalsCrossingTheSea (Chinese: 八仙過海).
 * @param inputWinningHand WinningHand to be evaluated.
 * @param config Configuration for Faan Calculation.
 * @returns true if the inputWinningHand is a KaanKaanHand (Chinese: 八仙過海).
 */
export default function isEightImmortalsCrossingTheSea(inputWinningHand: WinningHand, config?: FaanCalculationConfig) {
    if (config === undefined) {
        return false;
    }

    if (config.extraTiles === undefined || config.eightImmortalsCrossingTheSea === undefined) {
        return false;
    }

    if (config.eightImmortalsCrossingTheSea === false) {
        return false;
    }

    for (const [key, value] of Object.entries(config.extraTiles)) {
        if(value === false){
            return false;
        }
    }

    return true;
}
