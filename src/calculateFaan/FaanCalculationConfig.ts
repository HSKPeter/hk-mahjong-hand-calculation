type Winds = 'east' | 'south' | 'west' | 'north';

/**
 * This interface specifies the optional configuration when calculating the Faan value using the static method calculate() of the FaanCalculator.
 */
export default interface FaanCalculationConfig {
  /**
   * (Chinese: 自摸) The case where the winner wins by a draw.
   */
  selfPick?: boolean;

  /**
   * (Chinese: 門前清) The case where all tiles, except the last one, in a hand are self-drawn.
   */
  fullyConcealedHand?: boolean;

  /**
   * (Chinese: 搶槓) The case where the winner completes a winning with the tile that is used by another player to declare a Kong.
   */
  robbingKong?: boolean;

  /**
   * (Chinese: 海底撈月) The case where the winner.
   */
  winByLastCatch?: boolean;

  /**
   * (Chinese: 槓上自摸) The case where the winner self-pick the winning tile by obtaining it in a replacement after formation of a kong.
   */
  winByKong?: boolean;

  /**
   * (Chinese: 槓上槓自摸) The case where the winner self-pick the winning tile by obtaining it in a replacement after a second consecutive kong.
   */
  winByDoubleKong?: boolean;

  /**
   * (Chinese: 天糊) The case where the dealer (Chinese: 莊家) draws a winning hand at the beginning of the game.
   */
  heavenlyHand?: boolean;

  /**
   * (Chinese: 地糊) The case where the winner completes a winning hand with the dealer's (Chinese: 莊家) first discard and in most variants, provided the dealer does not draw a kong.
   */
  earthlyHand?: boolean;

  /**
   * (Chinese: 圈風)
   */
  roundWind?: Winds;

  /**
   * (Chinese: 門風)
   */
  seatWind?: Winds;

  /**
   * (Chinese: 花牌)
   */
  extraTiles?: {
    spring: boolean;
    summer: boolean;
    autumn: boolean;
    winter: boolean;
    plum: boolean;
    lily: boolean;
    chrysanthemum: boolean;
    bamboo: boolean;
  };

  /**
   * (Chinese: 八仙過海)
   */
  eightImmortalsCrossingTheSea?: boolean;

  /**
   * (Chinese: 花糊)
   */
  flowersHand?: boolean;

  enableBonusFaanDueToZeroExtraTile?: boolean;
}
