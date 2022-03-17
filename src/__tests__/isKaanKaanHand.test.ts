import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import { Tile, Meld, WinningHand, HandTypeFinder, FaanCalculator } from '../index';

test('Classify a valid KaanKaanHand', () => {
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
    selfPick: true,
    fullyConcealedHand: true,
  };

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, eyes]);
  expect(HandTypeFinder.isKaanKaanHand(winningHand, config)).toBe(true);

  const faanValue = FaanCalculator.calculate(winningHand, config);
  expect(faanValue).toBe(13);
});

test('Classify Winning Hands which are not a KaanKaanHand', () => {
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
    selfPick: false,
    fullyConcealedHand: true,
  };

  const config2: FaanCalculationConfig = {
    selfPick: true,
    fullyConcealedHand: false,
  };

  const config3: FaanCalculationConfig = {
    selfPick: false,
    fullyConcealedHand: false,
  };

  const config4: FaanCalculationConfig = {
    fullyConcealedHand: false,
  };

  const config5: FaanCalculationConfig = {
    fullyConcealedHand: true,
  };

  const config6: FaanCalculationConfig = {
    selfPick: true,
  };

  const config7: FaanCalculationConfig = {
    selfPick: false,
  };

  const config8: FaanCalculationConfig = {};

  const configs = [config1, config2, config3, config4, config5, config6, config7, config8];

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, eyes]);
  for (const config of configs) {
    expect(HandTypeFinder.isKaanKaanHand(winningHand, config)).toBe(false);
    const faanValue1 = FaanCalculator.calculate(winningHand, config);
    const baseFaanValue = 3;
    if (config['selfPick'] || config['fullyConcealedHand']) {
      expect(faanValue1).toBe(baseFaanValue + 1);
    } else {
      expect(faanValue1).toBe(baseFaanValue);
    }
  }

  expect(HandTypeFinder.isKaanKaanHand(winningHand)).toBe(false);
  const faanValue2 = FaanCalculator.calculate(winningHand);
  expect(faanValue2).toBe(3);
});
