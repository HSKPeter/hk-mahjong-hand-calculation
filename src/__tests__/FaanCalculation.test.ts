import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import Hand from '../hand/Hand';
import { Tile, Meld, WinningHand, FaanCalculator } from '../index';
import GraphemeSplitter = require('grapheme-splitter');

test('Calculate Faan values of different test cases', () => {
  const graphemeSplitter = new GraphemeSplitter();

  const testCasesOfStandardHands = [
    // ιη³
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 0,
    },
    // εΉ³η³
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 1,
    },
    // ζ··δΈθ²
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 3,
    },
    // ζ··δΈθ² ε°ε°η³
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 3 + 3,
    },
    // ε°ε°η³ (ζδΈ­/ηΌ/η½)
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 4,
    },
    // ε°ε°η³ (η‘δΈ­/ηΌ/η½)
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 3,
    },
    // θ±δΉ
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 4,
    },
    // ε°δΈε
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 5,
    },
    // ε°δΈε ε°ε°η³
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 5 + 3,
    },
    // ε°δΈε ζ··δΈθ² ε°ε°η³
    {
      tilesString: 'πππππππππππππππ',
      config: {},
      faanValue: 5 + 3 + 3,
    },
    // ζΈδΈθ²
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 7,
    },
    // ζΈδΈθ² ε°ε°η³
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 7 + 3,
    },
    // ζΈδΈθ² εΉ³η³
    {
      tilesString: 'πππππππππππ π‘π‘π‘',
      config: {},
      faanValue: 7 + 1,
    },
    // ε°εε
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // ε€§δΈε
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // ε€§εε
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // ε­δΈθ²
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // ε¨δΉδΉ
    {
      tilesString: 'ππππ‘π‘π‘ππππππππ',
      config: {},
      faanValue: 'β',
    },
    // εεη³
    {
      tilesString: 'ππππππππππππππ',
      config: { fullyConcealedHand: true, selfPick: true },
      faanValue: 'β',
    },
    // ζ§δΈζ§θͺζΈ
    {
      tilesString: 'ππππππππππππππ',
      config: { winByDoubleKong: true },
      faanValue: 'β',
    },
    // εε«ηΎζΌ’
    {
      tilesString: 'ππππππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // δΉε­ι£η°
    {
      tilesString: 'ππππππππππππππ',
      config: {},
      faanValue: 'β',
    },
    // ε€©η³
    {
      tilesString: 'ππππππππππππππ',
      config: { heavenlyHand: true },
      faanValue: 'β',
    },
    // ε°η³
    {
      tilesString: 'ππππππππππππππ',
      config: { earthlyHand: true },
      faanValue: 'β',
    },
  ];

  for (const testCase of testCasesOfStandardHands) {
    const { tilesString, config } = testCase;
    const tileChars = graphemeSplitter.splitGraphemes(tilesString);
    const tiles = tileChars.map((char) => new Tile(char));
    const hand = new Hand({ tiles });
    expect(hand.isAbleToGroupAsMelds()).toBe(true);
    const winningHand = hand.findAllWinningPermutations()[0];

    const expectedFaanValue = testCase['faanValue'];
    const { value } = FaanCalculator.calculate(winningHand, config);
    expect(value).toBe(expectedFaanValue);
  }

  const testCasesOfNonStandardHands = [
    // ε«δ»ιζ΅·
    {
      tilesString: 'ππππππππππππππ',
      config: {
        extraTiles: {
          spring: true,
          summer: true,
          autumn: true,
          winter: true,
          plum: true,
          lily: true,
          chrysanthemum: true,
          bamboo: true,
        },
        eightImmortalsCrossingTheSea: true,
      },
      faanValue: 'β',
    },
    // θ±η³
    {
      tilesString: 'ππππππππππππππ',
      config: {
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
        flowersHand: true,
      },
      faanValue: 3,
    },
  ];

  for (const testCase of testCasesOfNonStandardHands) {
    const { tilesString, config } = testCase;
    const tileChars = graphemeSplitter.splitGraphemes(tilesString);
    const tiles = tileChars.map((char) => new Tile(char));
    const hand = new Hand({ tiles });

    const expectedFaanValue = testCase['faanValue'];
    const { value } = FaanCalculator.calculate(hand, config);
    expect(value).toBe(expectedFaanValue);
  }
  type Winds = 'east' | 'south' | 'west' | 'north';
  const testCasesOfSpecialConfigs = [
    // θͺζΈ
    {
      config: {
        selfPick: true,
      },
      bonusFaanValue: 1,
    },
    // η‘θ±
    {
      config: {
        enableBonusFaanDueToZeroExtraTile: true,
        extraTiles: {
          spring: false,
          summer: false,
          autumn: false,
          winter: false,
          plum: false,
          lily: false,
          chrysanthemum: false,
          bamboo: false,
        },
      },
      bonusFaanValue: 1,
    },
    // ζ­£θ±
    {
      config: {
        extraTiles: {
          spring: true,
          summer: false,
          autumn: false,
          winter: false,
          plum: false,
          lily: false,
          chrysanthemum: false,
          bamboo: false,
        },
        seatWind: 'east' as Winds,
      },
      bonusFaanValue: 1,
    },
    // ιεζΈ
    {
      config: {
        fullyConcealedHand: true,
      },
      bonusFaanValue: 1,
    },
    // ζΆζ§
    {
      config: {
        robbingKong: true,
      },
      bonusFaanValue: 1,
    },
    // θͺζΈ + ιεζΈ
    {
      config: {
        selfPick: true,
        fullyConcealedHand: true,
      },
      bonusFaanValue: 2,
    },
    // ζ΅·εΊζζ
    {
      config: {
        selfPick: true,
        winByLastCatch: true,
      },
      bonusFaanValue: 2,
    },
    // ζ§δΈθͺζΈ
    {
      config: {
        selfPick: true,
        winByKong: true,
      },
      bonusFaanValue: 2,
    },
    // δΈε°θ±
    {
      config: {
        extraTiles: {
          spring: false,
          summer: false,
          autumn: false,
          winter: false,
          plum: true,
          lily: true,
          chrysanthemum: true,
          bamboo: true,
        },
      },
      bonusFaanValue: 2,
    },
  ];

  for (const specialConfig of testCasesOfSpecialConfigs) {
    const tilesString = 'ππππππππππππππ';
    const baseFaanValue = 3;
    const tileChars = graphemeSplitter.splitGraphemes(tilesString);
    const tiles = tileChars.map((char) => new Tile(char));
    const hand = new Hand({ tiles });
    const { value } = FaanCalculator.calculate(hand, specialConfig['config']);
    expect(value).toBe(baseFaanValue + specialConfig['bonusFaanValue']);
  }

  // εδΈεΉΊ
  const thirteenOrphans = 'πππππ‘πππππππππ';
  const tileChars = graphemeSplitter.splitGraphemes(thirteenOrphans);
  const tiles = tileChars.map((char) => new Tile(char));
  const hand = new Hand({ tiles });
  const { value } = FaanCalculator.calculate(hand);
  expect(value).toBe('β');
});
