import React from "react";
import styles from "./styles";

const Box = props => {
    return <div style={{ ...styles.container, ...props.style }}>{props.value}</div>;
};

export default Box;
