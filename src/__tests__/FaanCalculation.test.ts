import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import Hand from '../hand/Hand';
import { Tile, Meld, WinningHand, FaanCalculator } from '../index';
import GraphemeSplitter = require('grapheme-splitter');

test('Calculate Faan values of different test cases', () => {
  const graphemeSplitter = new GraphemeSplitter();

  const testCasesOfStandardHands = [
    // 雞糊
    {
      tilesString: '🀙🀙🀙🀜🀜🀜🀈🀉🀊🀐🀐🀐🀞🀞',
      config: {},
      faanValue: 0,
    },
    // 平糊
    {
      tilesString: '🀙🀚🀛🀐🀑🀒🀇🀈🀉🀊🀋🀌🀍🀍',
      config: {},
      faanValue: 1,
    },
    // 混一色
    {
      tilesString: '🀐🀐🀐🀔🀔🀔🀖🀗🀘🀂🀂🀂🀃🀃',
      config: {},
      faanValue: 3,
    },
    // 混一色 對對糊
    {
      tilesString: '🀐🀐🀐🀔🀔🀔🀗🀗🀗🀂🀂🀂🀃🀃',
      config: {},
      faanValue: 3 + 3,
    },
    // 對對糊 (有中/發/白)
    {
      tilesString: '🀚🀚🀚🀈🀈🀈🀝🀝🀝🀆🀆🀆🀁🀁',
      config: {},
      faanValue: 4,
    },
    // 對對糊 (無中/發/白)
    {
      tilesString: '🀚🀚🀚🀈🀈🀈🀝🀝🀝🀔🀔🀔🀁🀁',
      config: {},
      faanValue: 3,
    },
    // 花么
    {
      tilesString: '🀀🀀🀀🀏🀏🀏🀘🀘🀘🀙🀙🀙🀃🀃',
      config: {},
      faanValue: 4,
    },
    // 小三元
    {
      tilesString: '🀄🀄🀄🀅🀅🀅🀆🀆🀍🀎🀏🀙🀙🀙',
      config: {},
      faanValue: 5,
    },
    // 小三元 對對糊
    {
      tilesString: '🀄🀄🀄🀅🀅🀅🀆🀆🀈🀈🀈🀗🀗🀗',
      config: {},
      faanValue: 5 + 3,
    },
    // 小三元 混一色 對對糊
    {
      tilesString: '🀅🀅🀅🀅🀆🀆🀆🀉🀉🀉🀊🀊🀊🀄🀄',
      config: {},
      faanValue: 5 + 3 + 3,
    },
    // 清一色
    {
      tilesString: '🀇🀇🀇🀉🀉🀉🀋🀋🀋🀍🀎🀏🀏🀏',
      config: {},
      faanValue: 7,
    },
    // 清一色 對對糊
    {
      tilesString: '🀇🀇🀇🀉🀉🀉🀋🀋🀋🀍🀍🀏🀏🀏',
      config: {},
      faanValue: 7 + 3,
    },
    // 清一色 平糊
    {
      tilesString: '🀙🀚🀛🀚🀛🀜🀜🀝🀞🀟🀠🀡🀡🀡',
      config: {},
      faanValue: 7 + 1,
    },
    // 小四喜
    {
      tilesString: '🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀑🀒🀓',
      config: {},
      faanValue: '∞',
    },
    // 大三元
    {
      tilesString: '🀄🀄🀄🀅🀅🀅🀆🀆🀆🀈🀈🀗🀗🀗',
      config: {},
      faanValue: '∞',
    },
    // 大四喜
    {
      tilesString: '🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃🀑🀑',
      config: {},
      faanValue: '∞',
    },
    // 字一色
    {
      tilesString: '🀀🀀🀀🀁🀁🀁🀂🀂🀂🀃🀃🀃🀅🀅',
      config: {},
      faanValue: '∞',
    },
    // 全么九
    {
      tilesString: '🀙🀙🀙🀡🀡🀡🀐🀐🀐🀘🀘🀘🀇🀇',
      config: {},
      faanValue: '∞',
    },
    // 坎坎糊
    {
      tilesString: '🀚🀚🀚🀈🀈🀈🀝🀝🀝🀔🀔🀔🀁🀁',
      config: { fullyConcealedHand: true, selfPick: true },
      faanValue: '∞',
    },
    // 槓上槓自摸
    {
      tilesString: '🀙🀙🀙🀜🀜🀜🀈🀉🀊🀐🀐🀐🀞🀞',
      config: { winByDoubleKong: true },
      faanValue: '∞',
    },
    // 十八羅漢
    {
      tilesString: '🀚🀚🀚🀚🀈🀈🀈🀈🀝🀝🀝🀝🀔🀔🀔🀔🀁🀁',
      config: {},
      faanValue: '∞',
    },
    // 九子連環
    {
      tilesString: '🀇🀇🀇🀈🀈🀉🀊🀋🀌🀍🀎🀏🀏🀏',
      config: {},
      faanValue: '∞',
    },
    // 天糊
    {
      tilesString: '🀙🀙🀙🀜🀜🀜🀈🀉🀊🀐🀐🀐🀞🀞',
      config: { heavenlyHand: true },
      faanValue: '∞',
    },
    // 地糊
    {
      tilesString: '🀙🀙🀙🀜🀜🀜🀈🀉🀊🀐🀐🀐🀞🀞',
      config: { earthlyHand: true },
      faanValue: '∞',
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
    // 八仙過海
    {
      tilesString: '🀙🀛🀝🀒🀓🀔🀁🀂🀃🀅🀆🀊🀊🀊',
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
      faanValue: '∞',
    },
    // 花糊
    {
      tilesString: '🀙🀛🀝🀒🀓🀔🀁🀂🀃🀅🀆🀊🀊🀊',
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
    // 自摸
    {
      config: {
        selfPick: true,
      },
      bonusFaanValue: 1,
    },
    // 無花
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
    // 正花
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
    // 門前清
    {
      config: {
        fullyConcealedHand: true,
      },
      bonusFaanValue: 1,
    },
    // 搶槓
    {
      config: {
        robbingKong: true,
      },
      bonusFaanValue: 1,
    },
    // 自摸 + 門前清
    {
      config: {
        selfPick: true,
        fullyConcealedHand: true,
      },
      bonusFaanValue: 2,
    },
    // 海底撈月
    {
      config: {
        selfPick: true,
        winByLastCatch: true,
      },
      bonusFaanValue: 2,
    },
    // 槓上自摸
    {
      config: {
        selfPick: true,
        winByKong: true,
      },
      bonusFaanValue: 2,
    },
    // 一台花
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
    const tilesString = '🀐🀐🀐🀔🀔🀔🀖🀗🀘🀂🀂🀂🀃🀃';
    const baseFaanValue = 3;
    const tileChars = graphemeSplitter.splitGraphemes(tilesString);
    const tiles = tileChars.map((char) => new Tile(char));
    const hand = new Hand({ tiles });
    const { value } = FaanCalculator.calculate(hand, specialConfig['config']);
    expect(value).toBe(baseFaanValue + specialConfig['bonusFaanValue']);
  }

  // 十三幺
  const thirteenOrphans = '🀙🀙🀐🀇🀡🀘🀏🀀🀁🀂🀃🀄🀅🀆';
  const tileChars = graphemeSplitter.splitGraphemes(thirteenOrphans);
  const tiles = tileChars.map((char) => new Tile(char));
  const hand = new Hand({ tiles });
  const { value } = FaanCalculator.calculate(hand);
  expect(value).toBe('∞');
});
