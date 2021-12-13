import Meld from "./Meld";
import Tile from "../Tile";
import tilesOccurrencesMap from "../tilesOccurrencesMap";

export default function chow(inputTiles: Tile[]): Meld | null {
    const copyOfInputTiles = inputTiles.slice();

    const map = tilesOccurrencesMap(copyOfInputTiles);

    for (const suit in map) {
        if (suit === "honor") {
            continue;
        }

        for (const value in map[suit]) {
            if (parseInt(value) > Tile.ALL_SUIT_TYPES[suit]["maxValue"] - 2) {
                continue;
            }
            if (map[suit][value] !== undefined &&
                map[suit][parseInt(value) + 1] !== undefined &&
                map[suit][parseInt(value) + 2] !== undefined) {
                const tile1 = new Tile({suit: suit, value: parseInt(value)});
                const tile2 = new Tile({suit: suit, value: parseInt(value) + 1});
                const tile3 = new Tile({suit: suit, value: parseInt(value) + 2});
                const meldFormed = new Meld([tile1, tile2, tile3]);
                return meldFormed;
            }
        }
    }
    return null;
}