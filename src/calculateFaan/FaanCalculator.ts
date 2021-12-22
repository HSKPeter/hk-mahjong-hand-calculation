import WinningHand from '../hand/WinningHand';
import { FaanCalculationConfig } from './FaanCalculationConfig';
import HandTypeFinder from '../hand/handType/HandTypeFinder';
import { isThirteenOrphansAsWinningHand } from '../hand/handType/isThirteenOrphans';

/**
 * This class provides the static method that calculates the Faan value of a WinningHand.
 */
export default class FaanCalculator {
  private static MAX_FAAN_VALUE = 13;
  private static readonly FAAN_MAP = {
    commonHand: 1,
    allInTriplets: 3,
    mixedOneSuit: 3,
    smallDragons: 5,
    allOneSuit: 7,
  };

  private static readonly ADDITIONAL_FAAN_MAP = {
    selfPick: 1,
    fullyConcealedHand: 1,
    robbingKong: 1,
    winByLastCatch: 1,
    winByKong: 2,
    winByDoubleKong: 9,
    heavenlyHand: FaanCalculator.MAX_FAAN_VALUE,
    earthlyHand: FaanCalculator.MAX_FAAN_VALUE,
  };

  /**
   * Access the static maximum Faan value of FaanCalculator.
   * @returns {number}
   */
  public static getMaxFaanValue(): number {
    return FaanCalculator.MAX_FAAN_VALUE;
  }

  /**
   * Mutate the static maximum Faan value of FaanCalculator.
   * @param value
   */
  public static setMaxFaanValue(value: number): void {
    FaanCalculator.MAX_FAAN_VALUE = value;
  }

  /**
   * Calculate the Faan value of the inputWinningHand.
   * @param inputWinningHand
   * @param config
   * @returns {number}
   */
  public static calculate(inputWinningHand: WinningHand, config?: FaanCalculationConfig): number {
    if (FaanCalculator.hasMaxFaan(inputWinningHand)) {
      return FaanCalculator.MAX_FAAN_VALUE;
    } else {
      let result = 0;

      if (config) {
        if (config['heavenlyHand'] === true && config['earthlyHand'] === true) {
          throw new Error('"heavenlyHand" and "earthlyHand" are mutually exclusive');
        }

        if (config['heavenlyHand'] === true) {
          return FaanCalculator.ADDITIONAL_FAAN_MAP['heavenlyHand'];
        } else if (config['earthlyHand'] === true) {
          return FaanCalculator.ADDITIONAL_FAAN_MAP['earthlyHand'];
        }

        if (config['winByKong'] === true && config['winByDoubleKong'] === true) {
          throw new Error('"winByKong" and "winByDoubleKong" are mutually exclusive');
        }

        if (config['robbingKong'] === true && config['winByLastCatch'] === true) {
          throw new Error('"robbingKong" and "winByLastCatch" are mutually exclusive');
        }

        if (config['selfPick'] === true) {
          if (config['winByKong'] === true) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByKong'];
          } else if (config['winByDoubleKong'] === true) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByDoubleKong'];
          } else {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['selfPick'];
          }
        } else {
          if (config['winByKong'] === true) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByKong'];
          } else if (config['winByDoubleKong'] === true) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByDoubleKong'];
          }
        }

        if (config['robbingKong'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['robbingKong'];
        } else if (config['winByLastCatch'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByLastCatch'];
        }

        if (config['fullyConcealedHand'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['fullyConcealedHand'];
        }
      }

      if (HandTypeFinder.isSmallDragon(inputWinningHand)) {
        result += FaanCalculator.FAAN_MAP['smallDragons'];
      }

      if (HandTypeFinder.isCommonHand(inputWinningHand)) {
        result += FaanCalculator.FAAN_MAP['commonHand'];
      } else if (HandTypeFinder.isAllInTriplets(inputWinningHand)) {
        result += FaanCalculator.FAAN_MAP['allInTriplets'];
      }

      if (HandTypeFinder.isAllOneSuit(inputWinningHand)) {
        result += FaanCalculator.FAAN_MAP['allOneSuit'];
      } else if (HandTypeFinder.isMixedOneSuit(inputWinningHand)) {
        result += FaanCalculator.FAAN_MAP['mixedOneSuit'];
      }

      return Math.min(result, FaanCalculator.MAX_FAAN_VALUE);
    }
  }

  /**
   * Determine if the inputWinningHand reaches the maximum Faan value.
   * @param inputWinningHand
   * @returns {boolean}
   */
  private static hasMaxFaan(inputWinningHand: WinningHand): boolean {
    return (
      isThirteenOrphansAsWinningHand(inputWinningHand) ||
      HandTypeFinder.isAllKongs(inputWinningHand) ||
      HandTypeFinder.isOrphans(inputWinningHand) ||
      HandTypeFinder.isNineGates(inputWinningHand) ||
      HandTypeFinder.isAllHonors(inputWinningHand) ||
      HandTypeFinder.isGreatDragon(inputWinningHand) ||
      HandTypeFinder.isGreatWinds(inputWinningHand) ||
      HandTypeFinder.isSmallWinds(inputWinningHand)
    );
  }
}
