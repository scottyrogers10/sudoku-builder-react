import React, { Component } from "react";
import { Grid } from "../../../../components";
import styles from "./styles";

class Root extends Component {
    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <Grid rows={9} columns={9} />
            </div>
        );
    }
}

export default Root;
