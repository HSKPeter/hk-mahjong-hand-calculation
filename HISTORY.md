# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2022-03-16
### Fixed
* Fixed issue of WinningHand identification by improving robustness of search algorithm
* Fixed bug of Faan calculation of FlowerHand


## [3.1.4] - 2022-04-03
### Changed
* Changed the way to calculate Faan value of *smallDragon* which is simultaneously *AllInTriplets* 

## [3.1.3] - 2022-04-02
### Changed
* Exported the type of *FaanCalculationDetail*
* Added postversion script in package.json

## [3.1.2] - 2022-04-02
### Fixed
* Fixed bugs of missing noFlowers info in calculation details

## [3.1.1] - 2022-04-02
### Fixed
* Fixed bugs of inaccurate seatWind and roundWind in calculation details

### Changed
* Removed postversion script in package.json

## [3.1.0] - 2022-04-02
### Added
* Added language mode of FaanCalculator, such that the FaanCalculation could be rendered in different languages

### Changed
* Changed description of *Flower* in Glossary

## [3.0.0] - 2022-04-02
### Added
* Return calculation details when calculating Faan value

## [2.3.4] - 2022-03-20
### Changed
* Updated README.md
* Followed the format of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) to update HISTORY.md

## [2.3.3] - 2022-03-20
### Added
* added bonus Faan if there are Dragon Pongs

### Fixed
* fixed bugs of isMixedOneSuit


## [2.3.2] - 2022-03-18
### Fixed
* Fixed bugs of identifying ThirteenOrphans

## [2.3.1] - 2022-03-16
### Added
* Created new hand type of MixedOrphans
* Enabled optional Bonus Faan in FaanCalculation configuration when there are no possession of extra tiles

### Changed
* Adjusted value of bonus Faan and default value of maximum Faan in FaanCalculator


## [2.3.0] - 2022-03-16
### Added
* Enabled KaanKaanHand
* Enabled non-standard WinningHand of EightImmortalsCrossingTheSea and FlowerHand

## [2.2.1] - 2022-03-16
### Fixed
* corrected the way of calculation of Faan when considering extra tiles

## [2.2.0] - 2022-03-16
### Added
* Considered flowers and seasons tiles in Faan value calculation

## [2.1.4] - 2022-03-15
### Added
* Created more test cases to enhance the testing robustness

## [2.1.3] - 2022-03-15
### Added
* Considered round winds and seat winds in faan value calculation

### Changed
* Set faan value of 3 as the threshold of a Winning Hand
* Export FaanCalculationConfig

## [2.1.2] - 2022-03-12
### Changed
* Allowed eyes pair to be specified when initiating a Hand

## [2.1.1] - 2022-02-21
### Changed
* Updated HISTORY.md

## [2.1.0] - 2022-02-21
### Added
* Created over 10,000 new test cases for more robust testing

### Changed
* Implemented CI/CD


### Fixed
* Fixed bugs of identifying WinningHand



## [2.0.2] - 2022-01-25
### Changed
* Updated the search algorithms

## [2.0.1] - 2021-12-26
### Changed
* Added description of the package in package.json

## [2.0.0] - 2021-12-26
### Removed
* The classes *Game* and *Player* were deprecated as Game.ts and Player.ts were removed.

## [1.1.6] - 2021-12-22
### Fixed
* Fixed bugs to avoid duplicated WinningPermutations.

## [1.1.5] - 2021-12-22
### Added
* Added documentation for all classes, methods and interfaces.

## [1.1.4] - 2021-12-22
### Added
* Added documentation for classes, methods and interfaces in the *calculateFaan* directory.

### Changed
* Updated the license as MIT.

### Fixed
* Fixed typo in README.
* Revised the isIdentical() method of NodeForSearching.

## [1.1.3] - 2021-12-21
### Changed
* Changed tsconfig and required es6 for compiler options.

### Fixed
* Ensured private visibility of class attributes.
* Fixed typo in README.
  

## [1.1.2] - 2021-12-13
### Added
* Added HISTORY.md that listed the version history in details
* Added descriptions in README.
* Added MIT license.

### Fixed
* Fixed bug of Faan calculation.

## [1.1.1] - 2021-12-12
* Bumped new patch version of the package using CLI ```npm version patch```.

## [1.1.0] - 2021-12-12
### Fixed
* Fixed bugs and removed redundant scripts.

## [1.0.1] - 2021-12-12
### Added
* Added new scripts.

## [1.0.0] - 2021-12-08
* Initial release.
