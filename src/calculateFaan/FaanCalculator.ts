import WinningHand from "../WinningHand";
import { faanCalculationConfig } from "./faanCalculationConfig";
import HandTypeFinder from "./HandTypeFinder";

export default class FaanCalculator {
    private static MAX_FAAN_VALUE = 13;
    private static readonly FAAN_MAP = {
        commonHand: 1,
        allInTriplets: 3,
        mixedOneSuit: 3,        
        smallDragons: 5,
        allOneSuit: 7,
    }

    private static readonly ADDITIONAL_FAAN_MAP = {
        selfPick: 1,
        winFromWall: 1,
        robbingKong: 1,
        winByLastCatch: 1,
        winByKong: 2,
        winByDoubleKong: 9,
        heavenlyHand: FaanCalculator.MAX_FAAN_VALUE,
        earthlyHand: FaanCalculator.MAX_FAAN_VALUE
    }

    public static getMaxFaanValue() {
        return FaanCalculator.MAX_FAAN_VALUE;
    }

    public static setMaxFaanValue(value: number) {
        FaanCalculator.MAX_FAAN_VALUE = value;
    }

    public static calculate(inputWinningHand: WinningHand, config?: faanCalculationConfig): number {
        if (FaanCalculator.hasMaxFaan(inputWinningHand)) {
            return FaanCalculator.MAX_FAAN_VALUE;
        } else {
            let result = 0;

            if (config){
                if(config["heavenlyHand"] === true && config["earthlyHand"] === true){
                    throw new Error("\"heavenlyHand\" and \"earthlyHand\" are mutually exclusive");
                }

                if (config["heavenlyHand"] === true){
                    return FaanCalculator.ADDITIONAL_FAAN_MAP["heavenlyHand"];
                } else if (config["earthlyHand"] === true){
                    return FaanCalculator.ADDITIONAL_FAAN_MAP["earthlyHand"];
                }

                if(config["winByKong"] === true && config["winByDoubleKong"] === true){
                    throw new Error("\"winByKong\" and \"winByDoubleKong\" are mutually exclusive");
                }

                if(config["robbingKong"] === true && config["winByLastCatch"] === true){
                    throw new Error("\"robbingKong\" and \"winByLastCatch\" are mutually exclusive");
                }

                if(config["selfPick"] === true){
                    if (config["winByKong"] === true){
                        result += FaanCalculator.ADDITIONAL_FAAN_MAP["winByKong"];
                    } else if (config["winByDoubleKong"] === true){
                        result += FaanCalculator.ADDITIONAL_FAAN_MAP["winByDoubleKong"];
                    } else {
                        result += FaanCalculator.ADDITIONAL_FAAN_MAP["selfPick"];
                    }
                } else {
                    if (config["winByKong"] === true){
                        result += FaanCalculator.ADDITIONAL_FAAN_MAP["winByKong"];
                    } else if (config["winByDoubleKong"] === true){
                        result += FaanCalculator.ADDITIONAL_FAAN_MAP["winByDoubleKong"];
                    }
                }

                if (config["robbingKong"] === true){
                    result += FaanCalculator.ADDITIONAL_FAAN_MAP["robbingKong"];
                } else if (config["winByLastCatch"] === true){
                    result += FaanCalculator.ADDITIONAL_FAAN_MAP["winByLastCatch"];
                }

                if (config["winFromWall"] === true){
                    result += FaanCalculator.ADDITIONAL_FAAN_MAP["winFromWall"];
                }
            }

            if (HandTypeFinder.isSmallDragon(inputWinningHand)){
                result += FaanCalculator.FAAN_MAP["smallDragons"]
            }

            if (HandTypeFinder.isCommonHand(inputWinningHand)){
                result += FaanCalculator.FAAN_MAP["commonHand"]
            } else if (HandTypeFinder.isAllInTriplets(inputWinningHand)){
                result += FaanCalculator.FAAN_MAP["allInTriplets"]
            }
            
            if (HandTypeFinder.isAllOneSuit(inputWinningHand)){
                result += FaanCalculator.FAAN_MAP["allOneSuit"]
            } else if (HandTypeFinder.isMixedOneSuit(inputWinningHand)){
                result += FaanCalculator.FAAN_MAP["mixedOneSuit"]
            }

            return Math.min(result, FaanCalculator.MAX_FAAN_VALUE);
        }
    }

    private static hasMaxFaan(inputWinningHand: WinningHand) {
        return HandTypeFinder.isThirteenOrphansAsWinningHand(inputWinningHand) ||
            HandTypeFinder.isAllKongs(inputWinningHand) ||
            HandTypeFinder.isOrphans(inputWinningHand) ||
            HandTypeFinder.isNineGates(inputWinningHand) ||
            HandTypeFinder.isAllHonors(inputWinningHand) ||
            HandTypeFinder.isGreatDragon(inputWinningHand) ||
            HandTypeFinder.isGreatWinds(inputWinningHand) ||
            HandTypeFinder.isSmallWinds(inputWinningHand)
    }
}