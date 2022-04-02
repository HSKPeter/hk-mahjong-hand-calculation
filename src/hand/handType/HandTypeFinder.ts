import isAllKongs from './isAllKongs';
import isOrphans from './isOrphans';
import isNineGates from './isNineGates';
import isAllHonors from './isAllHonors';
import isGreatDragon from './isGreatDragon';
import isSmallWinds from './isSmallWinds';
import isGreatWinds from './isGreatWinds';
import isSmallDragon from './isSmallDragon';
import isCommonHand from './isCommonHand';
import isAllInTriplets from './isAllInTriplets';
import isAllOneSuit from './isAllOneSuit';
import isMixedOneSuit from './isMixedOneSuit';
import isKaanKaanHand from './isKaanKaanHand';
import isMixedOrphans from './isMixedOrphans';
import isEightImmortalsCrossingTheSea from './isEightImmortalsCrossingTheSea';
import isFlowerHand from './isFlowerHand';
import { isThirteenOrphansAsWinningHand } from './isThirteenOrphans';
import isWinByDoubleKong from './isWinByDoubleKong';

/**
 * This class includes static methods that help identify if a WinningHand belongs to any particular type of high-scoring hands.
 */
export default class HandTypeFinder {
  public static isThirteenOrphansAsWinningHand = isThirteenOrphansAsWinningHand;
  public static isAllKongs = isAllKongs;
  public static isOrphans = isOrphans;
  public static isNineGates = isNineGates;
  public static isAllHonors = isAllHonors;
  public static isGreatDragon = isGreatDragon;
  public static isSmallWinds = isSmallWinds;
  public static isGreatWinds = isGreatWinds;
  public static isSmallDragon = isSmallDragon;
  public static isCommonHand = isCommonHand;
  public static isAllInTriplets = isAllInTriplets;
  public static isAllOneSuit = isAllOneSuit;
  public static isMixedOneSuit = isMixedOneSuit;
  public static isKaanKaanHand = isKaanKaanHand;
  public static isEightImmortalsCrossingTheSea = isEightImmortalsCrossingTheSea;
  public static isFlowerHand = isFlowerHand;
  public static isMixedOrphans = isMixedOrphans;
  public static isWinByDoubleKong = isWinByDoubleKong;
}
