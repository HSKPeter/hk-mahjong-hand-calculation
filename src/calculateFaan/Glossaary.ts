type Language = 'en' | 'zh';

type Terms = {
  selfPick: string;
  noFlowers: string;
  flowers: string;
  commonHand: string;
  fullyConcealedHand: string;
  seatWind: string;
  roundWind: string;
  dragons: string;
  mixedOrphans: string;
  winByLastCatch: string;
  robbingKong: string;
  oneCompleteSetOfFlowers: string;
  twoCompleteSetOfFlowers: string;
  winByKong: string;
  mixedOneSuit: string;
  allInTriplets: string;
  flowerHand: string;
  smallDragon: string;
  allOneSuit: string;
  smallWind: string;
  greatDragon: string;
  greatWind: string;
  allHonors: string;
  orphans: string;
  thirteenOrphans: string;
  kaanKaanHand: string;
  winByDoubleKong: string;
  eightImmortalsCrossingTheSea: string;
  allKongs: string;
  nineGates: string;
  earthlyHand: string;
  heavenlyHand: string;
};

export default class Glossary {
  private static readonly CHINESE_MAP: Terms = {
    selfPick: '自摸',
    noFlowers: '無花',
    flowers: '正花',
    commonHand: '平糊',
    fullyConcealedHand: '門前清',
    seatWind: '門風',
    roundWind: '圈風',
    dragons: '中/發/白',
    mixedOrphans: '花幺',
    winByLastCatch: '海底撈月',
    robbingKong: '搶槓',
    oneCompleteSetOfFlowers: '一台花',
    twoCompleteSetOfFlowers: '兩台花',
    winByKong: '槓上自摸',
    mixedOneSuit: '混一色',
    allInTriplets: '對對糊',
    flowerHand: '花糊',
    smallDragon: '小三元',
    allOneSuit: '清一色',
    smallWind: '小四喜',
    greatDragon: '大三元',
    greatWind: '大四喜',
    allHonors: '字一色',
    orphans: '全幺九',
    thirteenOrphans: '十三幺',
    kaanKaanHand: '坎坎糊',
    winByDoubleKong: '槓上槓自摸',
    eightImmortalsCrossingTheSea: '八仙過海',
    allKongs: '十八羅漢',
    nineGates: '九子連環',
    earthlyHand: '地糊',
    heavenlyHand: '天糊',
  };

  private static readonly ENGLISH_MAP: Terms = {
    selfPick: 'self-pick',
    noFlowers: 'no flowers',
    flowers: 'with flower(s) that match seat position',
    commonHand: 'common hand',
    fullyConcealedHand: 'fully concealed hand',
    seatWind: 'seat wind',
    roundWind: 'round wind',
    dragons: 'dragons',
    mixedOrphans: 'mixed orphans',
    winByLastCatch: 'win by last catch',
    robbingKong: 'robbing kong',
    oneCompleteSetOfFlowers: 'one complete set of flowers',
    twoCompleteSetOfFlowers: 'two complete set of flowers',
    winByKong: 'win by Kong',
    mixedOneSuit: 'mixed one suit',
    allInTriplets: 'all in triplets',
    flowerHand: 'flower hand',
    smallDragon: 'small dragon',
    allOneSuit: 'all one suit',
    smallWind: 'small wind',
    greatDragon: 'great dragon',
    greatWind: 'great wind',
    allHonors: 'all honors',
    orphans: 'orphans',
    thirteenOrphans: 'thirteen orphans',
    kaanKaanHand: 'kaan kaan hand',
    winByDoubleKong: 'win by double Kong',
    eightImmortalsCrossingTheSea: 'eight immortals crossing the sea',
    allKongs: 'all Kongs',
    nineGates: 'nine gates',
    earthlyHand: 'earthly hand',
    heavenlyHand: 'heavenly hand',
  };

  private static language: Language = 'en';

  public static get(): Terms {
    if (this.language === 'en') {
      return this.ENGLISH_MAP;
    } else if (this.language === 'zh') {
      return this.CHINESE_MAP;
    } else {
      throw new Error('Language setting has not been configured appropriately.');
    }
  }

  public static setLanguage(languageInput: Language): void {
    if (languageInput === 'zh' || languageInput === 'en') {
      this.language = languageInput;
    } else {
      throw new Error('Invalid input of language setting.');
    }
  }
}
