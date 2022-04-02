import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import { Tile, Meld, HandTypeFinder, FaanCalculator, Hand } from '../index';

test('Classify a valid FlowerHand', () => {
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
  const config1: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: false,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config2: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: false,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config3: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: false,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config4: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: false,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config5: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: false,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config6: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: false,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config7: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: false,
      bamboo: true,
    },
  };

  const config8: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: false,
    },
  };

  const winningHand = new Hand({ melds: [meld1, meld2, meld3, meld4, eyes] });
  const configs = [config1, config2, config3, config4, config5, config6, config7, config8];
  configs.forEach((config) => {
    expect(HandTypeFinder.isFlowerHand(winningHand, config)).toBe(true);
    const {value: faanValue} = FaanCalculator.calculate(winningHand, config);
    expect(faanValue).toBe(3);
  });
});

test('Classify a valid FlowerHand even the Hand does not have 5 melds', () => {
  const tile1 = new Tile({ suit: 'bamboo', value: 1 });
  const tile2 = new Tile({ suit: 'bamboo', value: 8 });
  const tile3 = new Tile({ suit: 'dot', value: 5 });
  const tile4 = new Tile({ suit: 'dot', value: 9 });
  const tile5 = new Tile({ suit: 'character', value: 1 });
  const tile6 = new Tile({ suit: 'character', value: 3 });
  const tile7 = new Tile({ suit: 'character', value: 4 });
  const tile8 = new Tile({ suit: 'character', value: 6 });
  const tile9 = new Tile({ suit: 'character', value: 8 });
  const tile10 = new Tile({ suit: 'honor', value: 6 });
  const tile11 = new Tile({ suit: 'honor', value: 1 });
  const tile12 = new Tile({ suit: 'honor', value: 2 });
  const tile13 = new Tile({ suit: 'bamboo', value: 2 });
  const tile14 = new Tile({ suit: 'bamboo', value: 5 });

  const tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12, tile13, tile14];
  const hand = new Hand({ tiles });
  const config1: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: false,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config2: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: false,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config3: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: false,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config4: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: false,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config5: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: false,
      lily: true,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config6: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: false,
      chrysanthemum: true,
      bamboo: true,
    },
  };

  const config7: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: false,
      bamboo: true,
    },
  };

  const config8: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
      plum: true,
      lily: true,
      chrysanthemum: true,
      bamboo: false,
    },
  };

  const configs = [config1, config2, config3, config4, config5, config6, config7, config8];
  configs.forEach((config) => {
    expect(HandTypeFinder.isFlowerHand(hand, config)).toBe(true);
    const {value: faanValue} = FaanCalculator.calculate(hand, config);
    expect(faanValue).toBe(3);
  });
});

test('Classify Winning Hands which are not FlowerHand', () => {
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

  type extraTilesName = 'spring' | 'summer' | 'autumn' | 'winter' | 'plum' | 'lily' | 'chrysanthemum' | 'bamboo';

  const extraTilesNames: extraTilesName[] = [
    'spring',
    'summer',
    'autumn',
    'winter',
    'plum',
    'lily',
    'chrysanthemum',
    'bamboo',
  ];

  const winningHand = new Hand({ melds: [meld1, meld2, meld3, meld4, eyes] });
  const extraTilesAllTruthyConfig = {
    spring: true,
    summer: true,
    autumn: true,
    winter: true,
    plum: true,
    lily: true,
    chrysanthemum: true,
    bamboo: true,
  };
  const config1: FaanCalculationConfig = {
    flowersHand: true,
    extraTiles: extraTilesAllTruthyConfig,
  };
  expect(HandTypeFinder.isFlowerHand(winningHand, config1)).toBe(false);

  for (const name of extraTilesNames) {
    const extraTilesConfig = { ...extraTilesAllTruthyConfig };
    extraTilesConfig[name] = false;
    const config2: FaanCalculationConfig = {
      flowersHand: false,
      extraTiles: extraTilesConfig,
    };
    const config3: FaanCalculationConfig = {
      extraTiles: extraTilesConfig,
    };

    const baseFaanValue = 3;
    const bonusFaanValue = 2; // complete set of seasons/flowers tiles

    expect(HandTypeFinder.isFlowerHand(winningHand, config2)).toBe(false);
    const {value: faanValue1} = FaanCalculator.calculate(winningHand, config2);
    expect(faanValue1).toBe(baseFaanValue + bonusFaanValue);

    expect(HandTypeFinder.isFlowerHand(winningHand, config3)).toBe(false);
    const {value: faanValue2} = FaanCalculator.calculate(winningHand, config3);
    expect(faanValue2).toBe(baseFaanValue + bonusFaanValue);
  }

  expect(HandTypeFinder.isFlowerHand(winningHand)).toBe(false);
  const {value: faanValue3} = FaanCalculator.calculate(winningHand);
  expect(faanValue3).toBe(3);
});
