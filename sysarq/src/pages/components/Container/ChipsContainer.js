import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	chips: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
}));

const ChipsContainer = ({ children, marginTop, justifyContent }) => {
	const classes = useStyles();

	return (
		<div
			style={{ marginTop, justifyContent }}
			className={classes.chips}
		>
			{children}
		</div>
	);
};

ChipsContainer.propTypes = {
	children: PropTypes.node.isRequired,
	marginTop: PropTypes.string.isRequired,
	justifyContent: PropTypes.string.isRequired,
};

export default ChipsContainer;
