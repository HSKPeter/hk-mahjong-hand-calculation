/**
 * This interface describes the data structure that specifies the range of a Suit.
 */
interface RangeOfSuit {
  minValue: number;
  maxValue: number;
}

/**
 * This interface describes the configuration of a Suit.
 */
export default interface SuitsConfig {
  [suitName: string]: RangeOfSuit;
}
