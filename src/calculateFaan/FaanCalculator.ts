import WinningHand from '../hand/WinningHand';
import FaanCalculationConfig from './FaanCalculationConfig';
import HandTypeFinder from '../hand/handType/HandTypeFinder';
import { isThirteenOrphansAsWinningHand } from '../hand/handType/isThirteenOrphans';
import Meld from '../meld/Meld';
import Hand from '../hand/Hand';
import FaanCalculationDetail from './FaanCalculationDetail';
import Glossary from './Glossaary';

type CalculationResult = {
  value: number | '∞';
  details: FaanCalculationDetail[];
};

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
  // private static MAX_FAAN_VALUE = 100;

  /**
   * The dictionary that maps the Faan value of different types of WinningHand.
   */
  private static readonly FAAN_MAP = {
    commonHand: 1,
    mixedOrphans: 1,
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
    bonusFaanDueToZeroExtraTile: 1,
    fullyConcealedHand: 1,
    matchSeatWind: 1,
    matchRoundWind: 1,
    robbingKong: 1,
    winByLastCatch: 1,
    winByKong: 2,
    extraTile: 1,
    completeSetOfExtraTiles: 2,
    flowerHand: 3,
    // winByDoubleKong: "∞",
    // heavenlyHand: "∞",
    // earthlyHand: "∞",
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
  // public static getMaxFaanValue(): number {
  //   return FaanCalculator.MAX_FAAN_VALUE;
  // }

  /**
   * Mutate the static maximum Faan value of FaanCalculator.
   * @param value the new static maximum Faan value of FaanCalculator.
   */
  // public static setMaxFaanValue(value: number): void {
  //   FaanCalculator.MAX_FAAN_VALUE = value;
  // }

  /**
   * Calculate the Faan value of the inputWinningHand.
   * @param inputWinningHand the WinningHand of which the Faan value has to be calculated.
   * @param config configuration for the calculation of the Faan value.
   * @returns {CalculationResult} the Faan value.
   */
  public static calculate(inputWinningHand: WinningHand | Hand, config?: FaanCalculationConfig): CalculationResult {
    let winningHand: WinningHand;
    let result = 0;

    if (inputWinningHand instanceof Hand) {
      if (config !== undefined) {
        if (HandTypeFinder.isEightImmortalsCrossingTheSea(inputWinningHand, config)) {
          return {
            value: '∞',
            details: [
              {
                name: Glossary.get()['eightImmortalsCrossingTheSea'],
                value: '∞',
              },
            ],
          };
        }
        if (HandTypeFinder.isFlowerHand(inputWinningHand, config)) {
          return {
            value: FaanCalculator.ADDITIONAL_FAAN_MAP['flowerHand'],
            details: [
              {
                name: Glossary.get()['flowerHand'],
                value: '∞',
              },
            ],
          };
        }
      }

      if (inputWinningHand.isWinningHand()) {
        winningHand = inputWinningHand.findAllWinningPermutations()[0];
      } else {
        return {
          value: 0,
          details: [],
        };
      }
    } else {
      winningHand = inputWinningHand;
    }

    if (FaanCalculator.hasMaxFaan(winningHand, config)) {
      if (isThirteenOrphansAsWinningHand(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['thirteenOrphans'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isAllKongs(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['allKongs'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isOrphans(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['orphans'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isNineGates(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['nineGates'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isAllHonors(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['allHonors'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isGreatDragon(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['greatDragon'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isGreatWinds(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['greatWind'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isSmallWinds(winningHand)) {
        return {
          details: [
            {
              name: Glossary.get()['smallWind'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else if (HandTypeFinder.isWinByDoubleKong(winningHand, config)) {
        return {
          details: [
            {
              name: Glossary.get()['winByDoubleKong'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      } else {
        return {
          details: [
            {
              name: Glossary.get()['kaanKaanHand'],
              value: '∞',
            },
          ],
          value: '∞',
        };
      }
    } else if (HandTypeFinder.isFlowerHand(winningHand, config)) {
      return {
        value: FaanCalculator.ADDITIONAL_FAAN_MAP['flowerHand'],
        details: [
          {
            name: Glossary.get()['flowerHand'],
            value: '∞',
          },
        ],
      };
    } else {
      const melds = winningHand.getMelds();
      const details: FaanCalculationDetail[] = [];
      if (config) {
        if (config['heavenlyHand'] === true && config['earthlyHand'] === true) {
          throw new Error('"heavenlyHand" and "earthlyHand" are mutually exclusive');
        }

        if (config['enableBonusFaanDueToZeroExtraTile'] && config['extraTiles'] !== undefined) {
          let hasBonusFaanDueToZeroExtraTile = true;
          for (const [key, value] of Object.entries(config['extraTiles'])) {
            if (value !== false) {
              hasBonusFaanDueToZeroExtraTile = false;
            }
          }
          if (hasBonusFaanDueToZeroExtraTile) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['bonusFaanDueToZeroExtraTile'];
          }
        }

        if (config['heavenlyHand'] === true) {
          return {
            value: '∞',
            details: [
              {
                name: Glossary.get()['heavenlyHand'],
                value: '∞',
              },
            ],
          };
        } else if (config['earthlyHand'] === true) {
          return {
            value: '∞',
            details: [
              {
                name: Glossary.get()['earthlyHand'],
                value: '∞',
              },
            ],
          };
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
            details.push({
              name: Glossary.get()['winByKong'],
              value: FaanCalculator.ADDITIONAL_FAAN_MAP['winByKong'],
            });
          } else {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['selfPick'];
            details.push({
              name: Glossary.get()['selfPick'],
              value: FaanCalculator.ADDITIONAL_FAAN_MAP['selfPick'],
            });
          }
        } else {
          if (config['winByKong'] === true) {
            result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByKong'];
            details.push({
              name: Glossary.get()['winByKong'],
              value: FaanCalculator.ADDITIONAL_FAAN_MAP['winByKong'],
            });
          }
        }

        if (config['robbingKong'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['robbingKong'];
          details.push({
            name: Glossary.get()['robbingKong'],
            value: FaanCalculator.ADDITIONAL_FAAN_MAP['robbingKong'],
          });
        } else if (config['winByLastCatch'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['winByLastCatch'];
          details.push({
            name: Glossary.get()['winByLastCatch'],
            value: FaanCalculator.ADDITIONAL_FAAN_MAP['winByLastCatch'],
          });
        }

        if (config['fullyConcealedHand'] === true) {
          result += FaanCalculator.ADDITIONAL_FAAN_MAP['fullyConcealedHand'];
          details.push({
            name: Glossary.get()['fullyConcealedHand'],
            value: FaanCalculator.ADDITIONAL_FAAN_MAP['fullyConcealedHand'],
          });
        }

        if (config['seatWind']) {
          switch (config['seatWind']) {
            case 'east':
              if (FaanCalculator.hasPongOrKong(melds, '🀀')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              details.push({
                name: Glossary.get()['seatWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'],
              });
              break;
            case 'south':
              if (FaanCalculator.hasPongOrKong(melds, '🀁')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              details.push({
                name: Glossary.get()['seatWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'],
              });
              break;
            case 'west':
              if (FaanCalculator.hasPongOrKong(melds, '🀂')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              details.push({
                name: Glossary.get()['seatWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'],
              });
              break;
            case 'north':
              if (FaanCalculator.hasPongOrKong(melds, '🀃')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'];
              }
              details.push({
                name: Glossary.get()['seatWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchSeatWind'],
              });
              break;
            default:
          }
        }

        if (config['roundWind']) {
          switch (config['roundWind']) {
            case 'east':
              if (FaanCalculator.hasPongOrKong(melds, '🀀')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              details.push({
                name: Glossary.get()['roundWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'],
              });
              break;
            case 'south':
              if (FaanCalculator.hasPongOrKong(melds, '🀁')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              details.push({
                name: Glossary.get()['roundWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'],
              });
              break;
            case 'west':
              if (FaanCalculator.hasPongOrKong(melds, '🀂')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              details.push({
                name: Glossary.get()['roundWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'],
              });
              break;
            case 'north':
              if (FaanCalculator.hasPongOrKong(melds, '🀃')) {
                result += FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'];
              }
              details.push({
                name: Glossary.get()['roundWind'],
                value: FaanCalculator.ADDITIONAL_FAAN_MAP['matchRoundWind'],
              });
              break;
            default:
          }
        }

        if (config['extraTiles']) {
          result += FaanCalculator.calculateFaanFromExtraTiles(config);
          details.push({
            name: Glossary.get()['flowers'],
            value: FaanCalculator.calculateFaanFromExtraTiles(config),
          });
        }
      }

      const isSmallDragon = HandTypeFinder.isSmallDragon(winningHand);
      if (isSmallDragon) {
        result += FaanCalculator.FAAN_MAP['smallDragons'];
        details.push({
          name: Glossary.get()['smallDragon'],
          value: FaanCalculator.FAAN_MAP['smallDragons'],
        });
      } else if (HandTypeFinder.isAllInTriplets(winningHand)) {
        result += FaanCalculator.FAAN_MAP['allInTriplets'];
        details.push({
          name: Glossary.get()['allInTriplets'],
          value: FaanCalculator.FAAN_MAP['allInTriplets'],
        });
      } else if (HandTypeFinder.isCommonHand(winningHand)) {
        result += FaanCalculator.FAAN_MAP['commonHand'];
        details.push({
          name: Glossary.get()['commonHand'],
          value: FaanCalculator.FAAN_MAP['commonHand'],
        });
      }

      if (HandTypeFinder.isMixedOrphans(winningHand)) {
        result += FaanCalculator.FAAN_MAP['mixedOrphans'];
        details.push({
          name: Glossary.get()['mixedOrphans'],
          value: FaanCalculator.FAAN_MAP['mixedOrphans'],
        });
      }

      if (HandTypeFinder.isAllOneSuit(winningHand)) {
        result += FaanCalculator.FAAN_MAP['allOneSuit'];
        details.push({
          name: Glossary.get()['allOneSuit'],
          value: FaanCalculator.FAAN_MAP['allOneSuit'],
        });
      } else if (HandTypeFinder.isMixedOneSuit(winningHand)) {
        result += FaanCalculator.FAAN_MAP['mixedOneSuit'];
        details.push({
          name: Glossary.get()['mixedOneSuit'],
          value: FaanCalculator.FAAN_MAP['mixedOneSuit'],
        });
      }

      let numberOfDragons = 0;
      if (!isSmallDragon && FaanCalculator.hasPongOrKong(melds, '🀄')) {
        result += 1;
        numberOfDragons += 1;
      }

      if (!isSmallDragon && FaanCalculator.hasPongOrKong(melds, '🀅')) {
        result += 1;
        numberOfDragons += 1;
      }

      if (!isSmallDragon && FaanCalculator.hasPongOrKong(melds, '🀆')) {
        result += 1;
        numberOfDragons += 1;
      }

      if (numberOfDragons > 0 && numberOfDragons < 3) {
        details.push({
          name: Glossary.get()['dragons'],
          value: numberOfDragons,
        });
      }

      return {
        value: result,
        details,
      };
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
      HandTypeFinder.isWinByDoubleKong(inputWinningHand, config) ||
      HandTypeFinder.isKaanKaanHand(inputWinningHand, config)
    );
  }
}
