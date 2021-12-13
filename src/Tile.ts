import SuitsConfig from "./SuitsConfig";
import TileConfiguration from "./TileConfig";

export default class Tile {
    private suit: string;
    private value: number;
    public static readonly MAX_OCCURRENCE_IN_A_MAHJONG_SET: number = 4;
    private static readonly BASE_UNICODE: number = 0x0001F000;
    private static readonly CEILING_UNICODE: number = 0x0001F021;
    private static readonly INDEX_DENOTING_ERROR_TILE: number = 404;
    public static readonly ALL_SUIT_TYPES: SuitsConfig = {
        honor: {
            minValue: 1,
            maxValue: 7
        },
        character: {
            minValue: 1,
            maxValue: 9
        },
        bamboo: {
            minValue: 1,
            maxValue: 9
        },
        dot: {
            minValue: 1,
            maxValue: 9
        }
    };

    /**
     * Constructs an instance of Tile.
     * @param suitType 
     * @param value 
     */
    constructor(tileInput: TileConfiguration | string) {
        this.suit = "";
        this.value = 0;
        
        if (typeof tileInput === "object") {
            const formattedSuitTypeInput = tileInput.suit.toLowerCase();
            if (this.isValidInput(formattedSuitTypeInput, tileInput.value)) {
                this.suit = formattedSuitTypeInput;
                this.value = tileInput.value;
            } else {
                throw new Error("Invalid input for Tile.");
            }
        } else if (typeof tileInput === "string") {
            if (tileInput.length !== 2) {
                throw new Error("Invalid string input.");
            }
            const codePoint = (tileInput.codePointAt(0) || 0)
            if (codePoint >= Tile.BASE_UNICODE && codePoint <= Tile.CEILING_UNICODE) {
                const baseUnicodeOfhonorSuit = Tile.BASE_UNICODE;
                const baseUnicodeOfCharacterSuit = 0x0001F007;
                const baseUnicodeOfBambooSuit = 0x0001F010;
                const baseUnicodeOfDotSuit = 0x0001F019;

                let minUnicodeOfTileSuit: number;

                if (codePoint >= baseUnicodeOfhonorSuit && codePoint < baseUnicodeOfCharacterSuit) {
                    this.suit = "honor";
                    minUnicodeOfTileSuit = baseUnicodeOfhonorSuit;
                } else if (codePoint >= baseUnicodeOfCharacterSuit && codePoint < baseUnicodeOfBambooSuit) {
                    this.suit = "character";
                    minUnicodeOfTileSuit = baseUnicodeOfCharacterSuit;
                } else if (codePoint >= baseUnicodeOfBambooSuit && codePoint < baseUnicodeOfDotSuit) {
                    this.suit = "bamboo";
                    minUnicodeOfTileSuit = baseUnicodeOfBambooSuit;
                } else {
                    this.suit = "dot";
                    minUnicodeOfTileSuit = baseUnicodeOfDotSuit;
                }

                this.value = codePoint - minUnicodeOfTileSuit + 1;
            } else {
                throw new Error("Invalid string input.");
            }
        }

        if (this.suit === "" || this.value === 0){
            throw new Error ("Error of instantiating Tile.  Please ensure the input is accurate.")
        }
    }

    public getSuit(): string {
        return this.suit;
    }

    public getValue(): number {
        return this.value;
    }

    public isIdentical(inputTile: Tile): boolean {
        const isSameSuit = this.suit === inputTile.suit;
        const isSameValue = this.value === inputTile.value;
        return isSameSuit && isSameValue;
    }

    public isOrphan() {
        return this.value === 1 || this.value === 9;
    }

    public ishonor() {
        return this.suit === "honor";
    }

    public toString(): string {
        return String.fromCodePoint(Tile.BASE_UNICODE + this.computeReferenceIndex());
    }

    private computeReferenceIndex(): number {
        let baseIndex = 0;
        for (const suit in Tile.ALL_SUIT_TYPES) {
            if (this.suit === suit) {
                return baseIndex + this.value - 1;
            }
            baseIndex += Tile.ALL_SUIT_TYPES[suit]["maxValue"]
        }
        return Tile.INDEX_DENOTING_ERROR_TILE;
    }

    private isValidInput(suitTypeInput: string, valueInput: number): boolean {
        const typeIsValid = this.validateSuitType(suitTypeInput);
        if (typeIsValid) {
            return this.validateTileValue(suitTypeInput, valueInput);
        } else {
            return false;
        }
    }

    private validateSuitType(suitTypeInput: string): boolean {
        for (const suit in Tile.ALL_SUIT_TYPES) {
            if (suitTypeInput === suit) {
                return true;
            }
        }
        return false;
    }

    private validateTileValue(suitTypeInput: string, valueInput: number): boolean {
        const { minValue, maxValue } = Tile.ALL_SUIT_TYPES[suitTypeInput];
        return valueInput >= minValue && valueInput <= maxValue;
    }
}