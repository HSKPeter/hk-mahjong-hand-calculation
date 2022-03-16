import WinningHand from '../hand/WinningHand';
import FaanCalculationConfig from './FaanCalculationConfig';
import HandTypeFinder from '../hand/handType/HandTypeFinder';
import { isThirteenOrphansAsWinningHand } from '../hand/handType/isThirteenOrphans';
import Meld from '../meld/Meld';
import Hand from '../hand/Hand';

/**
 * This class provides the static method that calculates the Faan value of a WinningHand.
 */
export default class FaanCalculator {
  /**
   * The Faan value of threshold of a valid winning hand.
   */
  private static THRESHOLD_OF_VALID_WINNING_HAND = 3;

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
    extraTile: 1,
    completeSetOfExtraTiles: 2,
    flowerHand: 3,
    heavenlyHand: FaanCalculator.MAX_FAAN_VALUE,
    earthlyHand: FaanCalculator.MAX_FAAN_VALUE,
  };

  /**
   * Access the static Faan value threshold of FaanCalculator.
   * @returns {number} the static Faan value threshold of FaanCalculator.
   */
  public static getThresholdFaanValue(): number {
    return FaanCalculator.THRESHOLD_OF_VALID_WINNING_HAND;
  }

  /**
   * Mutate the static Faan value threshold of FaanCalculator.
   * @param value the new static Faan value threshold of FaanCalculator.
   */
  public static setThresholdFaanValue(value: number): void {
    FaanCalculator.THRESHOLD_OF_VALID_WINNING_HAND = value;
  }

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
  public static calculate(inputWinningHand: WinningHand | Hand, config?: FaanCalculationConfig): number {
    let winningHand: WinningHand;
    let result = 0;

    if (inputWinningHand instanceof Hand) {
      if (config !== undefined) {
        if (HandTypeFinder.isEightImmortalsCrossingTheSea(inputWinningHand, config)) {
          return FaanCalculator.MAX_FAAN_VALUE;
        } 
        if (HandTypeFinder.isFlowerHand(inputWinningHand,config)){
          return FaanCalculator.ADDITIONAL_FAAN_MAP['flowerHand'];
        }
      }

      if (inputWinningHand.isWinningHand()) {
        winningHand = inputWinningHand.findAllWinningPermutations()[0];
      } else {
        return result;
      }
    } else {
      winningHand = inputWinningHand
    }

    if (FaanCalculator.hasMaxFaan(winningHand, config)) {
      return FaanCalculator.MAX_FAAN_VALUE;
    } else {
      

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

        if (config['seatWind']) {
          const melds = winningHand.getMelds();
          switch (config['seatWind']) {
            case 'east':
              if (FaanCalculator.hasPongOrKong(melds, '🀀')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              break;
            case 'south':
              if (FaanCalculator.hasPongOrKong(melds, '🀁')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              break;
            case 'west':
              if (FaanCalculator.hasPongOrKong(melds, '🀂')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              break;
            case 'north':
              if (FaanCalculator.hasPongOrKong(melds, '🀃')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              break;
            default:
          }
        }

        if (config['roundWind']) {
          const melds = winningHand.getMelds();
          switch (config['roundWind']) {
            case 'east':
              if (FaanCalculator.hasPongOrKong(melds, '🀀')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              break;
            case 'south':
              if (FaanCalculator.hasPongOrKong(melds, '🀁')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              break;
            case 'west':
              if (FaanCalculator.hasPongOrKong(melds, '🀂')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              break;
            case 'north':
              if (FaanCalculator.hasPongOrKong(melds, '🀃')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              break;
            default:
          }
        }

        if (config['extraTiles']) {
          result += FaanCalculator.calculateFaanFromExtraTiles(config);
        }
      }

      if (HandTypeFinder.isSmallDragon(winningHand)) {
        result += FaanCalculator.FAAN_MAP['smallDragons'];
      }

      if (HandTypeFinder.isCommonHand(winningHand)) {
        result += FaanCalculator.FAAN_MAP['commonHand'];
      } else if (HandTypeFinder.isAllInTriplets(winningHand)) {
        result += FaanCalculator.FAAN_MAP['allInTriplets'];
      }

      if (HandTypeFinder.isAllOneSuit(winningHand)) {
        result += FaanCalculator.FAAN_MAP['allOneSuit'];
      } else if (HandTypeFinder.isMixedOneSuit(winningHand)) {
        result += FaanCalculator.FAAN_MAP['mixedOneSuit'];
      }

      return Math.min(result, FaanCalculator.MAX_FAAN_VALUE);
    }
  }

  private static hasPongOrKong(melds: Meld[], tileChar: string): boolean {
    for (const meld of melds) {
      const meldString = meld.toString();
      if (meldString === tileChar + tileChar + tileChar || meldString === tileChar + tileChar + tileChar + tileChar) {
        return true;
      }
    }
    return false;
  }

  private static calculateFaanFromExtraTiles(config: FaanCalculationConfig) {
    let result = 0;
    if (config['extraTiles']) {
      const { spring, summer, autumn, winter, plum, lily, chrysanthemum, bamboo } = config['extraTiles'];
      const hasAllSeasons = spring && summer && autumn && winter;
      const hasAllFlowers = plum && lily && chrysanthemum && bamboo;

      if (hasAllSeasons) {
        result += FaanCalculator.ADDITIONAL_FAAN_MAP['completeSetOfExtraTiles'];
      }
      if (hasAllFlowers) {
        result += FaanCalculator.ADDITIONAL_FAAN_MAP['completeSetOfExtraTiles'];
      }

      if (spring && !hasAllSeasons) {
        if (config['seatWind'] && config['seatWind'] === 'east') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (summer && !hasAllSeasons) {
        if (config['seatWind'] && config['seatWind'] === 'south') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (autumn && !hasAllSeasons) {
        if (config['seatWind'] && config['seatWind'] === 'west') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (winter && !hasAllSeasons) {
        if (config['seatWind'] && config['seatWind'] === 'north') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (plum && !hasAllFlowers) {
        if (config['seatWind'] && config['seatWind'] === 'east') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (lily && !hasAllFlowers) {
        if (config['seatWind'] && config['seatWind'] === 'south') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (chrysanthemum && !hasAllFlowers) {
        if (config['seatWind'] && config['seatWind'] === 'west') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      if (bamboo && !hasAllFlowers) {
        if (config['seatWind'] && config['seatWind'] === 'north') {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['extraTile'];
        }
      }

      return result;
    }
    return 0;
  }

  /**
   * Determine if the inputWinningHand reaches the maximum Faan value.
   * @param inputWinningHand the WinningHand to be evaluated.
   * @returns {boolean} true if the inputWinningHand reaches the maximum Faan value.
   */
  private static hasMaxFaan(inputWinningHand: WinningHand, config?: FaanCalculationConfig): boolean {
    return (
      isThirteenOrphansAsWinningHand(inputWinningHand) ||
      HandTypeFinder.isAllKongs(inputWinningHand) ||
      HandTypeFinder.isOrphans(inputWinningHand) ||
      HandTypeFinder.isNineGates(inputWinningHand) ||
      HandTypeFinder.isAllHonors(inputWinningHand) ||
      HandTypeFinder.isGreatDragon(inputWinningHand) ||
      HandTypeFinder.isGreatWinds(inputWinningHand) ||
      HandTypeFinder.isSmallWinds(inputWinningHand) ||
      HandTypeFinder.isKaanKaanHand(inputWinningHand, config)
    );
  }
}
