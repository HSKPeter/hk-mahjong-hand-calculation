import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import { Tile, Meld, WinningHand, FaanCalculator } from '../index';

test('Validate a Hand', () => {
  const tile1 = new Tile({ suit: 'dot', value: 1 });
  const tile2 = new Tile({ suit: 'dot', value: 2 });
  const tile3 = new Tile({ suit: 'dot', value: 3 });
  const tile4 = new Tile({ suit: 'dot', value: 4 });
  const tile5 = new Tile({ suit: 'dot', value: 5 });

  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4, tile4]);
  const meld5 = new Meld([tile5, tile5]);

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  const config: FaanCalculationConfig = { selfPick: true };

  const faanValue = FaanCalculator.calculate(winningHand, config);
  expect(faanValue).toBe(11);
});

test('Validate a Hand with matching seating and/or rounding wind', () => {
  const east = new Tile({ suit: 'honor', value: 1 });
  const south = new Tile({ suit: 'honor', value: 2 });
  const west = new Tile({ suit: 'honor', value: 3 });
  const north = new Tile({ suit: 'honor', value: 4 });

  const windTiles = [{ tile: east, name: "east" }, { tile: south, name: "south" }, { tile: west, name: "west" }, { tile: north, name: "north" }]

  const tile1 = new Tile({ suit: 'bamboo', value: 5 });
  const tile2 = new Tile({ suit: 'dot', value: 2 });
  const tile3 = new Tile({ suit: 'character', value: 3 });
  const tile4 = new Tile({ suit: 'bamboo', value: 4 });
  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4]);

  for (const windTile of windTiles) {
    const windPong = new Meld([windTile["tile"], windTile["tile"], windTile["tile"]]);
    const windKong = new Meld([windTile["tile"], windTile["tile"], windTile["tile"], windTile["tile"]]);
    const winningHand1 = new WinningHand([windPong, meld1, meld2, meld3, meld4]);
    const winningHand2 = new WinningHand([windKong, meld1, meld2, meld3, meld4]);
    const winningHands = [winningHand1, winningHand2];
    for (const winningHand of winningHands) {
      const config1: FaanCalculationConfig = {};
      const config2: FaanCalculationConfig = { roundWind: 'south' };
      const config3: FaanCalculationConfig = { seatWind: 'south' };
      const config4: FaanCalculationConfig = { roundWind: 'south', seatWind: 'south' };

      const faanValue1 = FaanCalculator.calculate(winningHand, config1);
      expect(faanValue1).toBe(3);

      const faanValue2 = FaanCalculator.calculate(winningHand, config2);
      expect(faanValue2).toBe(faanValue1 + 1);

      const faanValue3 = FaanCalculator.calculate(winningHand, config3);
      expect(faanValue3).toBe(faanValue2);

      const faanValue4 = FaanCalculator.calculate(winningHand, config4);
      expect(faanValue4).toBe(faanValue2 + 1);
    }
  }
});
