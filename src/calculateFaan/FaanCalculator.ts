import WinningHand from '../hand/WinningHand';
import FaanCalculationConfig from './FaanCalculationConfig';
import HandTypeFinder from '../hand/handType/HandTypeFinder';
import { isThirteenOrphansAsWinningHand } from '../hand/handType/isThirteenOrphans';

/**
 * This class provides the static method that calculates the Faan value of a WinningHand.
 */
export default class FaanCalculator {
  /**
   * The maximum Faan value.
   */
  private static MAX_FAAN_VALUE = 13;

  /**
   * The dictionary that maps the Faan value of different types of WinningHand.
   */
  private static readonly FAAN_MAP = {
    commonHand: 1,
    allInTriplets: 3,
    mixedOneSuit: 3,
    smallDragons: 5,
    allOneSuit: 7,
  };

  /**
   * The dictionary that maps the additional Faan value of different winning conditions.
   */
  private static readonly ADDITIONAL_FAAN_MAP = {
    selfPick: 1,
    fullyConcealedHand: 1,
    matchSeatWind: 1,
    matchRoundWind: 1,
    robbingKong: 1,
    winByLastCatch: 1,
    winByKong: 2,
    winByDoubleKong: 9,
    heavenlyHand: FaanCalculator.MAX_FAAN_VALUE,
    earthlyHand: FaanCalculator.MAX_FAAN_VALUE,
  };

  /**
   * Access the static maximum Faan value of FaanCalculator.
   * @returns {number} the static maximum Faan value of FaanCalculator.
   */
  public static getMaxFaanValue(): number {
    return FaanCalculator.MAX_FAAN_VALUE;
  }

  /**
   * Mutate the static maximum Faan value of FaanCalculator.
   * @param value the new static maximum Faan value of FaanCalculator.
   */
  public static setMaxFaanValue(value: number): void {
    FaanCalculator.MAX_FAAN_VALUE = value;
  }

  /**
   * Calculate the Faan value of the inputWinningHand.
   * @param inputWinningHand the WinningHand of which the Faan value has to be calculated.
   * @param config configuration for the calculation of the Faan value.
   * @returns {number} the Faan value.
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

        if (config["seatWind"]) {
          const melds = inputWinningHand.getMelds();
          switch (config["seatWind"]) {
            case "east":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀀🀀🀀" || "🀀🀀🀀🀀") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
                }
              }
              break;
            case "south":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀁🀁🀁" || "🀁🀁🀁🀁") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
                }
              }
              break;
            case "west":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀂🀂🀂" || "🀂🀂🀂🀂") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
                }
              }
              break;
            case "north":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀃🀃🀃" || "🀃🀃🀃🀃") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
                }
              }
              break;
            default:

          }
        }

        if (config["roundWind"]) {
          const melds = inputWinningHand.getMelds();
          switch (config["roundWind"]) {
            case "east":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀀🀀🀀" || "🀀🀀🀀🀀") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
                }
              }
              break;
            case "south":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀁🀁🀁" || "🀁🀁🀁🀁") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
                }
              }
              break;
            case "west":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀂🀂🀂" || "🀂🀂🀂🀂") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
                }
              }
              break;
            case "north":
              for (const meld of melds) {
                const meldString = meld.toString();
                if (meldString === "🀃🀃🀃" || "🀃🀃🀃🀃") {
                  result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
                }
              }
              break;
            default:

          }
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
   * @param inputWinningHand the WinningHand to be evaluated.
   * @returns {boolean} true if the inputWinningHand reaches the maximum Faan value.
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
