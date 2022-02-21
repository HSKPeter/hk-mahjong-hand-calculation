import { Hand, Tile } from '../index';
import riichiData from './riichiCases';

const tileToUnicodeMap: { [id: string]: string } = {
    '1m': '🀇',
    '2m': '🀈',
    '3m': '🀉',
    '4m': '🀊',
    '5m': '🀋',
    '6m': '🀌',
    '7m': '🀍',
    '8m': '🀎',
    '9m': '🀏',
    '1p': '🀙',
    '2p': '🀚',
    '3p': '🀛',
    '4p': '🀜',
    '5p': '🀝',
    '6p': '🀞',
    '7p': '🀟',
    '8p': '🀠',
    '9p': '🀡',
    '1s': '🀐',
    '2s': '🀑',
    '3s': '🀒',
    '4s': '🀓',
    '5s': '🀔',
    '6s': '🀕',
    '7s': '🀖',
    '8s': '🀗',
    '9s': '🀘',
    '1z': '🀀',
    '2z': '🀁',
    '3z': '🀂',
    '4z': '🀃',
    '5z': '🀆',
    '6z': '🀅',
    '7z': '🀄',
}

const convertStringToHand = (hand: string) => {
    const tileString = hand.slice(0, 26).match(/.{1,2}/g)
    const lastTileChar: string =
        hand[26] !== '+' ? hand.slice(26, 28) : hand.slice(27, 29)
    if (tileString !== null) {
        const tiles = [];
        for (const tileChar of tileString) {
            const tileUnicode = tileToUnicodeMap[tileChar];
            tiles.push(new Tile(tileUnicode));
        }
        tiles.push(new Tile(tileToUnicodeMap[lastTileChar]));
        return new Hand({ tiles });
    }
    throw new Error("Tile String is not a valid Hand.");
}

const isSevenPairs = (handInput: Hand) => {
    const map: { [key: string]: number } = {};
    const tilesString = handInput.toString();

    for (const tile of tilesString) {
        if (map[tile] === undefined) {
            map[tile] = 1;
        } else {
            map[tile]++;
        }
    }

    let numberOfPairs = 0;
    for (const tile in map) {
        if (map[tile] === 2) {
            numberOfPairs++;
        }
    }

    return numberOfPairs === 7;
}

const hkMahjongCases = riichiData
    .map(dataString => convertStringToHand(dataString))
    .filter(hand => !isSevenPairs(hand));
    
export default hkMahjongCases;

