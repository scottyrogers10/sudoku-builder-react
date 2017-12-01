import React, { Component } from "react";
import { Grid } from "../../../../components";
import styles from "./styles";

class Root extends Component {
    constructor() {
        super();

        this._generateButtonClickHandler = this._generateButtonClickHandler.bind(this);
        this._solveButtonClickHandler = this._solveButtonClickHandler.bind(this);
    }

    _generateButtonClickHandler() {
        this.grid.generate();
    }

    _solveButtonClickHandler() {
        this.grid.solve();
    }

    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.centerContainer}>
                    <Grid ref={grid => (this.grid = grid)} rows={9} columns={9} />
                    <div style={styles.buttonsContainer}>
                        <div style={styles.actionButton} onClick={this._generateButtonClickHandler}>
                            GENERATE
                        </div>

                        <div
                            style={{ ...styles.actionButton, ...styles.solveButton }}
                            onClick={this._solveButtonClickHandler}>
                            SOLVE
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Root;
