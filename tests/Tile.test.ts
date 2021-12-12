import Mahjong from "../package/main";

test('Validate East Tile', () => {
  const suit = "honor";
  const value = 1;
  const east = new Mahjong.Tile({suit, value});
  expect(east.toString()).toBe("🀀");
  expect(east.getSuit()).toBe(suit);
  expect(east.getValue()).toBe(value);
});

test('Compare East Tile and South Tile', () => {
  const suit = "honor";
  const east = new Mahjong.Tile({suit, value: 1});
  const south = new Mahjong.Tile({suit, value: 2});
  expect(east.isIdentical(south)).toBe(false);
});

test('Compare two tiles (honor suit) that are instantiated in different ways', () => {
  const tile1 = new Mahjong.Tile("🀀");
  const tile2 = new Mahjong.Tile({suit: "honor", value: 1});
  expect(tile1.isIdentical(tile2)).toBe(true);
});

test('Compare two tiles (character suit) that are instantiated in different ways', () => {
  const tile1 = new Mahjong.Tile("🀊");
  const tile2 = new Mahjong.Tile({suit: "character", value: 4});
  expect(tile1.isIdentical(tile2)).toBe(true);
});

test('Compare two tiles (bamboo suit) that are instantiated in different ways', () => {
  const tile1 = new Mahjong.Tile("🀕");

  // In both upper cases and lower cases
  const tile2 = new Mahjong.Tile({suit: "BaMBoO", value: 6});
  expect(tile1.isIdentical(tile2)).toBe(true);
});

test('Compare two tiles (dot suit) that are instantiated in different ways', () => {
  const tile1 = new Mahjong.Tile("🀡");

  // Capitalized
  const tile2 = new Mahjong.Tile({suit: "Dot", value: 9});
  expect(tile1.isIdentical(tile2)).toBe(true);
});

test('Erroneous ways in instantiating Tile', () => {
  expect(() => {
    new Mahjong.Tile("1");
  }).toThrow();

  expect(() => {
    new Mahjong.Tile("ab");
  }).toThrow();

  expect(() => {
    new Mahjong.Tile("&%");
  }).toThrow();

  expect(() => {
    new Mahjong.Tile("^@#%%#!");
  }).toThrow();

});