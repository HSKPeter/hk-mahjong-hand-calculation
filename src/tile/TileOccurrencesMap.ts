/**
 * This interface describes the data structure of the object that maps the number of occurrences of Tiles.
 */
export default interface TileOccurrencesMap {
  [suit: string]: {
    [value: string]: number;
  };
}
