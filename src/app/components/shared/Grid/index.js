import React, { Component } from "react";
import styles from "./styles";

class Grid extends Component {
    constructor() {
        super();

        this.state = {
            grid: [],
            difficulty: "easy"
        };
    }

    _fillSlot(grid) {
        const location = this._getRandomLocation(grid);
        const digit = this._getRandomNumber(1, 9);

        if (this._isFilledSlotValid(grid, location, digit)) {
            const updatedGrid = [...grid];
            updatedGrid[location[0]][location[1]] = digit;
            return updatedGrid;
        } else {
            return this._fillSlot(grid);
        }
    }

    _generateRandomGrid(difficulty) {
        const difficultyMap = {
            hard: 15,
            medium: 20,
            easy: 30
        };

        const emptyGrid = this._getEmptyGrid(this.props.rows, this.props.columns);
        const slotsToFill = difficultyMap[difficulty];
        const populatedGrid = this._getPopulatedGrid([...emptyGrid], slotsToFill);

        this.setState({
            grid: populatedGrid
        });

        console.log(populatedGrid);
    }

    _getEmptyGrid(rows, columns) {
        const emptyGrid = [];

        for (let i = 0; i < rows; i++) {
            emptyGrid.push([]);
            for (let j = 0; j < columns; j++) {
                emptyGrid[i].push(0);
            }
        }

        return emptyGrid;
    }

    _getPopulatedGrid(grid, remainingSlotsToFill) {
        if (remainingSlotsToFill === 0) {
            return grid;
        } else {
            const updatedGrid = this._fillSlot([...grid]);
            return this._getPopulatedGrid(updatedGrid, remainingSlotsToFill - 1);
        }
    }

    _getRandomLocation(grid) {
        const randRow = this._getRandomNumber(0, 8);
        const randCol = this._getRandomNumber(0, 8);
        const location = [randRow, randCol];

        if (this._isSlotEmpty(grid, location)) {
            return location;
        } else {
            return this._getRandomLocation(grid);
        }
    }

    _getRandomNumber(lowerBound, upperBound) {
        return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
    }

    _getSubGridValues(grid, rowSubSections, columnSubSections) {
        const subGridValues = [];

        rowSubSections.forEach(rowSubSection => {
            columnSubSections.forEach(columnSubSection => {
                subGridValues.push(grid[rowSubSection][columnSubSection]);
            });
        });

        return subGridValues;
    }

    _isFilledSlotValid(grid, location, digit) {
        const horizontalValidation = this._isHorizontalValid(grid, location, digit);
        const verticalValidation = this._isVerticalValid(grid, location, digit);
        const subGridValidation = this._isSubGridValid(grid, location, digit);

        return horizontalValidation && verticalValidation && subGridValidation;
    }

    _isHorizontalValid(grid, location, digit) {
        const row = grid[location[0]];
        return !row.includes(digit);
    }

    _isSlotEmpty(grid, location) {
        return grid[location[0]][location[1]] === 0 ? true : false;
    }

    _isSubGridValid(grid, location, digit) {
        const subSectionsMap = {
            "0": [0, 1, 2],
            "1": [0, 1, 2],
            "2": [0, 1, 2],
            "3": [3, 4, 5],
            "4": [3, 4, 5],
            "5": [3, 4, 5],
            "6": [6, 7, 8],
            "7": [6, 7, 8],
            "8": [6, 7, 8]
        };

        const rowSubSections = subSectionsMap[location[0]];
        const columnSubSections = subSectionsMap[location[1]];
        const subGridValues = this._getSubGridValues(grid, rowSubSections, columnSubSections);

        return !subGridValues.includes(digit);
    }

    _isVerticalValid(grid, location, digit) {
        const column = grid.map(row => {
            return row[location[1]];
        });

        return !column.includes(digit);
    }

    componentWillMount() {
        this._generateRandomGrid(this.state.difficulty);
    }

    render() {
        return <div style={{ ...styles.container, ...this.props.style }} />;
    }
}

export default Grid;
