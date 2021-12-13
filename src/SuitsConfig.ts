interface RangeOfSuit {
    minValue: number,
    maxValue: number
}

export default interface SuitsConfig {
    [suitName: string]: RangeOfSuit
}