import React from "react";
import PropTypes from "prop-types";

import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	specialLabels: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(1),

		width: "100%",
		textAlign: "left",

		color: "#787878",
		fontSize: "15px",
		fontWeight: "bold",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},
}));

const SpecialLabels = ({ label }) => {
	const classes = useStyles();

	return <Typography className={classes.specialLabels}>{label}</Typography>;
};

SpecialLabels.propTypes = {
	label: PropTypes.string.isRequired,
};

export default SpecialLabels;
