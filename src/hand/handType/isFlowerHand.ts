import FaanCalculationConfig from '../../calculateFaan/FaanCalculationConfig';
import Hand from '../Hand';
import WinningHand from '../WinningHand';

/**
 * Determine if the WinningHand is a a FlowerHand (Chinese: 花糊).
 * @param inputHand WinningHand to be evaluated.
 * @param config Configuration for Faan Calculation.
 * @returns true if the inputWinningHand is a FlowerHand (Chinese: 花糊).
 */
export default function isFlowerHand(inputHand: Hand | WinningHand, config?: FaanCalculationConfig) {
    if (config === undefined) {
        return false;
    }

    if (inputHand instanceof Hand) {
        if (inputHand.getAllTiles().length < 13) {
            return false;
        }
    } 

    if (config.extraTiles === undefined || config.flowersHand === undefined) {
        return false;
    }

    if (config.flowersHand === false) {
        return false;
    }

    let counter = 0;
    for (const [key, value] of Object.entries(config.extraTiles)) {
        if (value === true) {
            counter++;
        }
    }

    const numberOfExtraTilesRequired = 7;
    return counter === numberOfExtraTilesRequired;
}
