import Meld from "./Meld";
import Tile from "../tile/Tile";
import tilesOccurrencesMap from "../tile/tilesOccurrencesMap";

export default function kong(inputTiles: Tile[]): Meld | null {
    const copyOfInputTiles = inputTiles.slice();

    const map = tilesOccurrencesMap(copyOfInputTiles);

    for (const suit in map) {
        for (const value in map[suit]) {
            if (map[suit][value] === Meld.NUMBER_OF_TILES_FOR_KONG) {
                const tiles = [];
                for (let i = 0; i < Meld.NUMBER_OF_TILES_FOR_KONG; i++) {
                    tiles.push(new Tile({suit: suit, value: parseInt(value)}));
                }
                const meldFormed = new Meld(tiles);
                return meldFormed;
            }
        }
    }
    return null;
}