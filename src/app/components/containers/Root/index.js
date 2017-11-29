import React, { Component } from "react";
import { Grid } from "../../../../components";
import styles from "./styles";

class Root extends Component {
    constructor() {
        super();

        this._generateButtonClickHandler = this._generateButtonClickHandler.bind(this);
    }

    _generateButtonClickHandler() {
        this.grid.generate();
    }

    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.centerContainer}>
                    <Grid ref={grid => (this.grid = grid)} rows={9} columns={9} />
                    <div style={styles.generateButtonPosition}>
                        <div style={styles.generateButton} onClick={this._generateButtonClickHandler}>
                            GENERATE
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Root;
