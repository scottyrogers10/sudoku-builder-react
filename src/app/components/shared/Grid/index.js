import React, { Component } from "react";
import Row from "./Row";
import styles from "./styles";

class Grid extends Component {
    constructor() {
        super();

        this.difficultyMap = {
            EASY: 30,
            MEDIUM: 20,
            HARD: 15
        };

        this.state = {
            grid: [],
            difficulty: "EASY"
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

    _getNextUnassignedLocation(grid) {
        const unassignedLocation = [];

        for (let i = 0; i < this.props.rows; i++) {
            if (unassignedLocation.length === 0) {
                for (let j = 0; j < this.props.columns; j++) {
                    if (this._isSlotEmpty(grid, [i, j])) {
                        unassignedLocation.push(i, j);
                        break;
                    }
                }
            } else {
                break;
            }
        }

        return unassignedLocation;
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
            "1": [3, 4, 5],
            "2": [6, 7, 8]
        };

        const rowSubSections = subSectionsMap[Math.floor(location[0] / 3)];
        const columnSubSections = subSectionsMap[Math.floor(location[1] / 3)];
        const subGridValues = this._getSubGridValues(grid, rowSubSections, columnSubSections);

        return !subGridValues.includes(digit);
    }

    _isVerticalValid(grid, location, digit) {
        const column = grid.map(row => {
            return row[location[1]];
        });

        return !column.includes(digit);
    }

    generate() {
        const emptyGrid = this._getEmptyGrid(this.props.rows, this.props.columns);
        const slotsToFill = this.difficultyMap[this.state.difficulty];
        const populatedGrid = this._getPopulatedGrid([...emptyGrid], slotsToFill);

        this.setState({
            grid: populatedGrid
        });
    }

    solve(grid = this.state.grid) {
        const location = this._getNextUnassignedLocation(grid);

        if (location.length !== 0) {
            for (let i = 1; i <= 9; i++) {
                if (this._isFilledSlotValid(grid, location, i)) {
                    grid[location[0]][location[1]] = i;

                    if (this.solve(grid)) {
                        return true;
                    } else {
                        grid[location[0]][location[1]] = 0;
                    }
                }
            }

            return false;
        } else {
            this.setState({
                grid
            });
            return true;
        }
    }

    componentWillMount() {
        this.generate();
    }

    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <Row data={this.state.grid[0]} />
                <Row data={this.state.grid[1]} />
                <Row data={this.state.grid[2]} style={styles.borderSubGrid} />
                <Row data={this.state.grid[3]} />
                <Row data={this.state.grid[4]} />
                <Row data={this.state.grid[5]} style={styles.borderSubGrid} />
                <Row data={this.state.grid[6]} />
                <Row data={this.state.grid[7]} />
                <Row data={this.state.grid[8]} />
            </div>
        );
    }
}

export default Grid;
