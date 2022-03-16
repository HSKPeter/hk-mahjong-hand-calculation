import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import { Tile, Meld, HandTypeFinder, FaanCalculator, Hand } from '../index';

test('Classify a valid EightImmortalsCrossingTheSea', () => {
    const tile1 = new Tile({ suit: 'bamboo', value: 1 });
    const tile2 = new Tile({ suit: 'bamboo', value: 8 });
    const tile3 = new Tile({ suit: 'dot', value: 5 });
    const tile4 = new Tile({ suit: 'dot', value: 9 });
    const tile5 = new Tile({ suit: 'character', value: 6 });

    const meld1 = new Meld([tile1, tile1, tile1]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const eyes = new Meld([tile5, tile5]);
    const config: FaanCalculationConfig = {
        eightImmortalsCrossingTheSea: true,
        extraTiles: {
            spring: true,
            summer: true,
            autumn: true,
            winter: true,
            plum: true,
            lily: true,
            chrysanthemum: true,
            bamboo: true
        }
    }

    const winningHand = new Hand({melds:[meld1, meld2, meld3, meld4, eyes]});
    expect(HandTypeFinder.isEightImmortalsCrossingTheSea(winningHand, config)).toBe(true);

    const faanValue = FaanCalculator.calculate(winningHand, config);
    expect(faanValue).toBe(13);
});

test('Classify Winning Hands which are not EightImmortalsCrossingTheSea', () => {
    const tile1 = new Tile({ suit: 'bamboo', value: 1 });
    const tile2 = new Tile({ suit: 'bamboo', value: 8 });
    const tile3 = new Tile({ suit: 'dot', value: 5 });
    const tile4 = new Tile({ suit: 'dot', value: 9 });
    const tile5 = new Tile({ suit: 'character', value: 6 });

    const meld1 = new Meld([tile1, tile1, tile1]);
    const meld2 = new Meld([tile2, tile2, tile2]);
    const meld3 = new Meld([tile3, tile3, tile3]);
    const meld4 = new Meld([tile4, tile4, tile4]);
    const eyes = new Meld([tile5, tile5]);

    type extraTilesName =
        "spring"
        | "summer"
        | "autumn"
        | "winter"
        | "plum"
        | "lily"
        | "chrysanthemum"
        | "bamboo"

    const extraTilesNames: extraTilesName[] = [
        "spring", "summer", "autumn", "winter", "plum", "lily", "chrysanthemum", "bamboo"
    ]

    const winningHand = new Hand({melds:[meld1, meld2, meld3, meld4, eyes]});
    const extraTilesAllTruthyConfig = {
        spring: true,
        summer: true,
        autumn: true,
        winter: true,
        plum: true,
        lily: true,
        chrysanthemum: true,
        bamboo: true
    }

    for (const name of extraTilesNames) {
        const extraTilesConfig = { ...extraTilesAllTruthyConfig };
        extraTilesConfig[name] = false;
        const config1: FaanCalculationConfig = {
            eightImmortalsCrossingTheSea: true,
            extraTiles: extraTilesConfig
        }
        const config2: FaanCalculationConfig = {
            eightImmortalsCrossingTheSea: false,
            extraTiles: extraTilesConfig
        }
        expect(HandTypeFinder.isEightImmortalsCrossingTheSea(winningHand, config1)).toBe(false);
        
        const baseFaanValue = 3;
        const bonusFaanValue = 2; // complete set of seasons/flowers tiles

        const faanValue1 = FaanCalculator.calculate(winningHand, config1);        
        expect(faanValue1).toBe(baseFaanValue + bonusFaanValue);

        expect(HandTypeFinder.isEightImmortalsCrossingTheSea(winningHand, config2)).toBe(false);
        const faanValue2 = FaanCalculator.calculate(winningHand, config2);
        expect(faanValue2).toBe(baseFaanValue + bonusFaanValue);
    }

    expect(HandTypeFinder.isEightImmortalsCrossingTheSea(winningHand)).toBe(false);
    const faanValue4 = FaanCalculator.calculate(winningHand);
    expect(faanValue4).toBe(3);
});
