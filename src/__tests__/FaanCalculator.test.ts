import FaanCalculationConfig from '../calculateFaan/FaanCalculationConfig';
import { Tile, Meld, WinningHand, FaanCalculator } from '../index';

function setExpectedFaanValue(originalFaanValue: string | number, incrementValue: number){
  const result = typeof originalFaanValue === "string" ? originalFaanValue :  (originalFaanValue + incrementValue);
  return result;
}

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

  const {value: faanValue} = FaanCalculator.calculate(winningHand, config);
  expect(faanValue).toBe(11);
});

test('Validate a Hand with matching seating and/or rounding wind', () => {
  const east = new Tile({ suit: 'honor', value: 1 });
  const south = new Tile({ suit: 'honor', value: 2 });
  const west = new Tile({ suit: 'honor', value: 3 });
  const north = new Tile({ suit: 'honor', value: 4 });

  const windTiles: { tile: Tile; name: 'east' | 'south' | 'west' | 'north' }[] = [
    { tile: east, name: 'east' },
    { tile: south, name: 'south' },
    { tile: west, name: 'west' },
    { tile: north, name: 'north' },
  ];

  const tile1 = new Tile({ suit: 'bamboo', value: 5 });
  const tile2 = new Tile({ suit: 'dot', value: 2 });
  const tile3 = new Tile({ suit: 'character', value: 3 });
  const tile4 = new Tile({ suit: 'bamboo', value: 4 });
  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4]);

  for (const windTile of windTiles) {
    const windPong = new Meld([windTile['tile'], windTile['tile'], windTile['tile']]);
    const windKong = new Meld([windTile['tile'], windTile['tile'], windTile['tile'], windTile['tile']]);
    const winningHand1 = new WinningHand([windPong, meld1, meld2, meld3, meld4]);
    const winningHand2 = new WinningHand([windKong, meld1, meld2, meld3, meld4]);
    const winningHands = [winningHand1, winningHand2];
    for (const winningHand of winningHands) {
      const config1: FaanCalculationConfig = {};
      const config2: FaanCalculationConfig = { roundWind: windTile['name'] };
      const config3: FaanCalculationConfig = { seatWind: windTile['name'] };
      const config4: FaanCalculationConfig = { roundWind: windTile['name'], seatWind: windTile['name'] };

      const {value: faanValue1} = FaanCalculator.calculate(winningHand, config1);
      expect(faanValue1).toBe(3);

      const {value: faanValue2} = FaanCalculator.calculate(winningHand, config2);
      expect(faanValue2).toBe(setExpectedFaanValue(faanValue1, 1));

      const {value: faanValue3} = FaanCalculator.calculate(winningHand, config3);
      expect(faanValue3).toBe(faanValue2);

      const {value: faanValue4} = FaanCalculator.calculate(winningHand, config4);
      expect(faanValue4).toBe(setExpectedFaanValue(faanValue2, 1));
    }
  }
});

test('Validate a Hand with extra tiles', () => {
  const tile1 = new Tile({ suit: 'bamboo', value: 5 });
  const tile2 = new Tile({ suit: 'dot', value: 2 });
  const tile3 = new Tile({ suit: 'character', value: 3 });
  const tile4 = new Tile({ suit: 'bamboo', value: 4 });
  const tile5 = new Tile({ suit: 'bamboo', value: 8 });
  const meld1 = new Meld([tile1, tile1, tile1]);
  const meld2 = new Meld([tile2, tile2, tile2]);
  const meld3 = new Meld([tile3, tile3, tile3]);
  const meld4 = new Meld([tile4, tile4, tile4]);
  const meld5 = new Meld([tile5, tile5]);

  type Wind = 'east' | 'south' | 'west' | 'north';
  const winds: Wind[] = ['east', 'south', 'west', 'north'];

  type Season = 'spring' | 'summer' | 'autumn' | 'winter';
  const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];

  type Flower = 'plum' | 'lily' | 'chrysanthemum' | 'bamboo';
  const flowers: Flower[] = ['plum', 'lily', 'chrysanthemum', 'bamboo'];

  const extraTiles = {
    spring: false,
    summer: false,
    autumn: false,
    winter: false,
    plum: false,
    lily: false,
    chrysanthemum: false,
    bamboo: false,
  };

  const winningHand = new WinningHand([meld1, meld2, meld3, meld4, meld5]);
  const {value: originalFaanValue} = FaanCalculator.calculate(winningHand);
  winds.forEach((wind, index) => {
    const extraTilesConfig1 = { ...extraTiles };

    extraTilesConfig1[seasons[index]] = true;
    const {value: faanValue1} = FaanCalculator.calculate(winningHand, {
      seatWind: wind,
      extraTiles: extraTilesConfig1,
    });
    expect(faanValue1).toBe(setExpectedFaanValue(originalFaanValue, 1));
    

    const {value: faanValue2} = FaanCalculator.calculate(winningHand, {
      roundWind: wind,
      extraTiles: extraTilesConfig1,
    });
    expect(faanValue2).toBe(originalFaanValue);

    const extraTilesConfig2 = { ...extraTiles };
    extraTilesConfig2[flowers[index]] = true;
    const {value: faanValue3} = FaanCalculator.calculate(winningHand, {
      seatWind: wind,
      extraTiles: extraTilesConfig2,
    });
    expect(faanValue3).toBe(setExpectedFaanValue(originalFaanValue,1));

    const {value: faanValue4} = FaanCalculator.calculate(winningHand, {
      roundWind: wind,
      extraTiles: extraTilesConfig2,
    });
    expect(faanValue4).toBe(originalFaanValue);
  });

  const extraTilesConfig3 = { ...extraTiles };
  extraTilesConfig3['spring'] = true;
  extraTilesConfig3['summer'] = true;
  extraTilesConfig3['autumn'] = true;
  extraTilesConfig3['winter'] = true;
  const {value: faanValue5} = FaanCalculator.calculate(winningHand, {
    extraTiles: extraTilesConfig3,
  });
  expect(faanValue5).toBe(setExpectedFaanValue(originalFaanValue, 2));

  for (const wind of winds) {
    const {value: faanValue6} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig3,
      seatWind: wind,
    });
    expect(faanValue6).toBe(setExpectedFaanValue(originalFaanValue, 2));

    const {value: faanValue7} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig3,
      roundWind: wind,
    });
    expect(faanValue7).toBe(setExpectedFaanValue(originalFaanValue, 2));
  }

  for (const wind1 of winds) {
    for (const wind2 of winds) {
      const {value: faanValue8} = FaanCalculator.calculate(winningHand, {
        extraTiles: extraTilesConfig3,
        seatWind: wind1,
        roundWind: wind2,
      });
      expect(faanValue8).toBe(setExpectedFaanValue(originalFaanValue,2));
    }
  }

  const extraTilesConfig4 = { ...extraTiles };
  extraTilesConfig4['plum'] = true;
  extraTilesConfig4['lily'] = true;
  extraTilesConfig4['chrysanthemum'] = true;
  extraTilesConfig4['bamboo'] = true;
  const {value: faanValue9} = FaanCalculator.calculate(winningHand, {
    extraTiles: extraTilesConfig4,
  });
  expect(faanValue9).toBe(setExpectedFaanValue(originalFaanValue,2));

  for (const wind of winds) {
    const {value: faanValue10} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig4,
      seatWind: wind,
    });
    expect(faanValue10).toBe(setExpectedFaanValue(originalFaanValue,2));

    const {value: faanValue11} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig4,
      roundWind: wind,
    });
    expect(faanValue11).toBe(setExpectedFaanValue(originalFaanValue,2));
  }

  for (const wind1 of winds) {
    for (const wind2 of winds) {
      const {value: faanValue12} = FaanCalculator.calculate(winningHand, {
        extraTiles: extraTilesConfig4,
        seatWind: wind1,
        roundWind: wind2,
      });
      expect(faanValue12).toBe(setExpectedFaanValue(originalFaanValue,2));
    }
  }

  const extraTileNames: (Season | Flower)[] = [];
  for (const season of seasons) {
    extraTileNames.push(season);
  }

  for (const flower of flowers) {
    extraTileNames.push(flower);
  }

  const {value: faanValue13} = FaanCalculator.calculate(winningHand, {
    extraTiles: extraTilesConfig4,
  });
  expect(faanValue13).toBe(setExpectedFaanValue(originalFaanValue,2));

  for (const wind of winds) {
    const {value: faanValue14} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig4,
      seatWind: wind,
    });
    expect(faanValue14).toBe(setExpectedFaanValue(originalFaanValue,2));

    const {value: faanValue15} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig4,
      roundWind: wind,
    });
    expect(faanValue15).toBe(setExpectedFaanValue(originalFaanValue,2));
  }

  for (const wind1 of winds) {
    for (const wind2 of winds) {
      const {value: faanValue16} = FaanCalculator.calculate(winningHand, {
        extraTiles: extraTilesConfig4,
        seatWind: wind1,
        roundWind: wind2,
      });
      expect(faanValue16).toBe(setExpectedFaanValue(originalFaanValue,2));
    }
  }

  const extraTilesConfig5 = { ...extraTiles };
  for (const name of extraTileNames) {
    extraTilesConfig5[name] = true;
  }

  for (const name of extraTileNames) {
    const extraTilesConfig6 = { ...extraTilesConfig5 };
    extraTilesConfig6[name] = false;
    const {value: faanValue17} = FaanCalculator.calculate(winningHand, {
      extraTiles: extraTilesConfig6,
      flowersHand: true,
    });
    expect(faanValue17).toBe(3);

    for (const wind of winds) {
      const {value: faanValue18} = FaanCalculator.calculate(winningHand, {
        extraTiles: extraTilesConfig4,
        seatWind: wind,
      });
      expect(faanValue18).toBe(setExpectedFaanValue(originalFaanValue,2));

      const {value: faanValue19} = FaanCalculator.calculate(winningHand, {
        extraTiles: extraTilesConfig4,
        roundWind: wind,
      });
      expect(faanValue19).toBe(setExpectedFaanValue(originalFaanValue,2));
    }

    for (const wind1 of winds) {
      for (const wind2 of winds) {
        const {value: faanValue20} = FaanCalculator.calculate(winningHand, {
          extraTiles: extraTilesConfig4,
          seatWind: wind1,
          roundWind: wind2,
        });
        expect(faanValue20).toBe(setExpectedFaanValue(originalFaanValue,2));
      }
    }
  }
});
