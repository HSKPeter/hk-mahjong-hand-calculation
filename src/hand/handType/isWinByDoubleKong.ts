import FaanCalculationConfig from '../../calculateFaan/FaanCalculationConfig';
import { MeldType } from '../../meld/MeldType';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a WinByDoubleKong (Chinese: 槓上自摸).
 * @param inputWinningHand WinningHand to be evaluated.
 * @param config Configuration for Faan Calculation.
 * @returns true if the inputWinningHand is a WinByDoubleKong (Chinese: 槓上自摸).
 */
export default function isWinByDoubleKong(inputWinningHand: WinningHand, config?: FaanCalculationConfig) {
    if (config === undefined) {
        return false;
    }
    return config.winByDoubleKong;
}
