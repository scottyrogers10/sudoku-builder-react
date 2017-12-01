import React from "react";
import Box from "./Box";
import styles from "./styles";

const Row = props => {
    const renderBoxes = row => {
        if (row) {
            return row.map((digit, index) => {
                const value = digit !== 0 ? digit : "";
                const subGridBorder = index === 2 || index === 5 ? { borderRight: "3px solid #000" } : {};

                return <Box style={{ ...styles.box, ...subGridBorder }} key={`BOX_${index}`} value={value} />;
            });
        } else {
            return null;
        }
    };

    return <div style={{ ...styles.container, ...props.style }}>{renderBoxes(props.data)}</div>;
};

export default Row;
